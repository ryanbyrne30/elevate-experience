import { z } from "zod";
import { createRouter } from "./context";

export const eventsRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany();
    },
  })
  .query("get", {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.event.findUniqueOrThrow({
        where: { id: input.id },
      });
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
  })
  .mutation("update", {
    input: z.object({
      id: z.number(),
      name: z.union([z.undefined(), z.string()]),
      date: z.union([z.undefined(), z.date()]),
      location: z.union([z.undefined(), z.string()]),
      description: z.union([z.undefined(), z.string()]),
    }),
    async resolve({ input, ctx }) {
      return null;
    },
  });
