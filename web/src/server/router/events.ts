import { z } from "zod";
import { createRouter } from "./context";

export const eventsRouter = createRouter().mutation("create", {
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
