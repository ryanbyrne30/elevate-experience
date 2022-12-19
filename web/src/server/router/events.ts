import { z } from "zod";
import { createProtectedRouter, createRouter } from "./context";
import { TRPCError } from "@trpc/server";

export const eventsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany({
        include: {
          teams: {
            include: {
              teamPlayers: true,
            },
          },
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.event.findUniqueOrThrow({
        where: { id: input.id },
        include: {
          teams: {
            include: {
              teamPlayers: true,
            },
          },
        },
      });
    },
  });

export const protectedEventsRouter = createProtectedRouter().mutation(
  "register",
  {
    input: z.object({
      eventId: z.number(),
      guests: z.array(z.string().transform((s) => s.trim())),
      userIds: z.array(z.string().transform((s) => s.trim())),
    }),
    async resolve({ input, ctx }) {
      const currentUserId: string = ctx.session.user.id;
      const event = await ctx.prisma.event.findUniqueOrThrow({
        where: { id: input.eventId },
        include: {
          teams: {
            include: {
              teamPlayers: true,
            },
          },
        },
      });

      // get list of previously registered players
      const previousRegisteredUserIds: string[] = [];
      const previousRegisteredGuests: string[] = [];
      event.teams.forEach((team) => {
        team.guests
          ?.split(",")
          .forEach((g) => previousRegisteredGuests.push(g));
        team.teamPlayers.forEach((p) =>
          previousRegisteredUserIds.push(p.userId)
        );
      });

      // check if user has not registered prior
      if (previousRegisteredUserIds.includes(currentUserId))
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already registered for this event.",
        });

      // check if all players have not registered prior
      input.guests.forEach((guest) => {
        if (previousRegisteredGuests.includes(guest))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `A guest is already registered for this event with the name '${guest}'. Please register guests with unique names.`,
          });
      });
      input.userIds.forEach((userId) => {
        if (previousRegisteredUserIds.includes(userId))
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `User '${userId}' has already registered for this event.`,
          });
      });

      // create and return team
      return await ctx.prisma.team.create({
        data: {
          eventId: event.id,
          guests: input.guests.join(","),
          teamPlayers: {
            createMany: {
              data: [
                { userId: currentUserId },
                ...input.userIds.map((userId) => ({
                  userId,
                })),
              ],
            },
          },
        },
      });
    },
  }
);
