import { z } from "zod";
import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";

export const userRouter = createRouter().mutation("register", {
  input: z.object({
    email: z.string().email(),
    name: z.string().min(1).regex(new RegExp("[a-zA-Z]+( [a-zA-Z]+)+")),
  }),
  async resolve({ input, ctx }) {
    const existingUser = await ctx.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existingUser !== null)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email already exists",
      });
    return await ctx.prisma.user.create({
      data: {
        ...input,
      },
    });
  },
});
