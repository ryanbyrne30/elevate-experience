import { z } from "zod";
import { createRouter } from "./context";

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
          divisions: {
            include: {
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
          divisions: {
            include: {
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
          },
        },
      });
    },
  });
