import { z } from "zod";
import { createRouter } from "./context";

export const eventsRouter = createRouter()
  .query("getAll", {
    // input: z.object({
    // perPage: z.number().default(20),
    // page: z.number().default(0),
    // }),
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      date: z.date(),
      location: z.string().nullish(),
      description: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.event.create({
        data: input,
      });
    },
  });
