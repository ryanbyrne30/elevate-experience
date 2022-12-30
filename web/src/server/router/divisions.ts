import { z } from "zod";
import { createProtectedRouter, createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { env } from "@/env/server.mjs";
import { createStripeSession } from "../common/stripe";

export const divisionsRouter = createRouter().query("get", {
  input: z.object({
    id: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await ctx.prisma.division.findUniqueOrThrow({
      where: { id: input.id },
      include: {
        event: true,
      },
    });
  },
});

export const protectedDivisionsRouter = createProtectedRouter()
  .mutation("register", {
    input: z.object({
      divisionId: z.string(),
      guests: z.array(z.string().transform((s) => s.trim())),
      userIds: z.array(z.string().transform((s) => s.trim())),
    }),
    async resolve({ ctx, input }) {
      const currentUserId = ctx.session.user.id;
      const allUserIds = [currentUserId, ...input.userIds];
      const [division, users] = await ctx.prisma.$transaction([
        ctx.prisma.division.findUniqueOrThrow({
          where: { id: input.divisionId },
          include: {
            event: true,
            teams: {
              include: {
                teamUsers: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        }),
        ctx.prisma.user.findMany({
          where: {
            id: {
              in: allUserIds,
            },
          },
        }),
      ]);

      // check if users exist
      const foundUserIds = users.map((u) => u.id);
      if (users.length !== allUserIds.length)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Users not found: ${allUserIds.filter(
            (u) => !foundUserIds.includes(u)
          )}.`,
        });

      // check if registration is open for division
      if (division.teamEntryFee === null)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Registration for this event is closed.",
        });

      // check if team size has been fulfilled
      if (division.teamSize !== input.guests.length + input.userIds.length + 1)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid team size.",
        });

      // get registered players
      const registeredGuests: string[] = [];
      const registeredUserIds: string[] = [];
      division.teams.forEach((team) => {
        team.teamUsers.forEach((tu) => registeredUserIds.push(tu.userId));
        team.guests
          ?.split(",")
          .forEach((guest) => registeredGuests.push(guest));
      });

      // check if any players are already registered
      if (registeredUserIds.includes(currentUserId))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already registered for this division.",
        });
      input.guests.forEach((guest) => {
        if (registeredGuests.includes(guest))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `A guest has already been registered for this division with the name '${guest}'. Guest name should be unique.`,
          });
      });
      input.userIds.forEach((uid) => {
        if (registeredUserIds.includes(uid))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `User has already been registered for this event '${uid}'.`,
          });
      });

      // create team
      await ctx.prisma.team.create({
        data: {
          divisionId: input.divisionId,
          guests: input.guests.length > 0 ? input.guests.join(",") : null,
          teamUsers: {
            createMany: {
              data: [
                { userId: currentUserId },
                ...input.userIds.map((userId) => ({ userId })),
              ],
            },
          },
        },
      });

      // if tournament is free then return
      if (division.teamEntryFee === 0) return { sessionId: null };

      // Create Stripe session
      const redirectUrl = `${env.NEXTAUTH_URL}/divisions/${division.id}/register`;
      const stripeSession = await createStripeSession(
        `${division.event.name} - ${division.name}`,
        division.teamEntryFee,
        1,
        redirectUrl
      );

      return { sessionId: stripeSession.id };
    },
  })
  .mutation("unregister", {
    input: z.object({
      divisionId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const teams = await ctx.prisma.team.findMany({
        where: {
          divisionId: input.divisionId,
          teamUsers: {
            some: {
              userId,
            },
          },
        },
      });
      const team = teams[0];
      if (teams.length > 1)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User has registered for multiple teams for event: ${input.divisionId}`,
        });
      if (team === undefined)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User is not registered for division: ${input.divisionId}`,
        });
      await ctx.prisma.team.delete({
        where: { id: team.id },
      });
    },
  });
