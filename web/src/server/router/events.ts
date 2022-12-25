import { z } from "zod";
import { createProtectedRouter, createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { env } from "@/env/server.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const eventsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany({
        where: {
          date: {
            gte: new Date(),
          },
        },
        include: {
          teams: {
            include: {
              teamPlayers: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: {
          date: "asc",
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
              teamPlayers: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    },
  });

export const protectedEventsRouter = createProtectedRouter()
  .mutation("register", {
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

      // check if you can register for the event
      if (event.teamEntryFee === null)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot register for this event. No price has been set.",
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

      // create team
      await ctx.prisma.team.create({
        data: {
          eventId: event.id,
          guests: input.guests.length > 0 ? input.guests.join(",") : null,
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

      // if tournament is free then return
      if (event.teamEntryFee === 0) return { sessionId: null };

      // Create Stripe session
      const redirectUrl = `${env.NEXTAUTH_URL}/events/${event.id}/register`;
      const stripeSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: event.name,
                },
                unit_amount: event.teamEntryFee * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${redirectUrl}?status=success`,
          cancel_url: `${redirectUrl}?status=cancel`,
        });
      return { sessionId: stripeSession.id };
    },
  })
  .mutation("unregister", {
    input: z.object({
      eventId: z.number(),
    }),
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id;
      const teams = await ctx.prisma.team.findMany({
        where: {
          eventId: input.eventId,
          teamPlayers: {
            some: {
              userId,
            },
          },
        },
      });
      if (teams.length === 0)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User is not registered for event: ${input.eventId}`,
        });
      if (teams.length > 1)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User has registered for multiple teams for event: ${input.eventId}`,
        });
      const team = teams[0];
      if (team !== undefined)
        await ctx.prisma.team.delete({
          where: { id: team.id },
        });
    },
  });
