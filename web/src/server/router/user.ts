import { z } from "zod";
import { createProtectedRouter, createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { sendEmailHtml, userInfoToHtmlFromContext } from "@/utils/email";
import { env } from "@/env/server.mjs";
import { userCheckers } from "@/utils/zodCheckers/user";

export const userRouter = createRouter()
  .mutation("register", {
    input: z.object(userCheckers),
    async resolve({ input, ctx }) {
      const existingUsers = await ctx.prisma.user.findMany({
        where: {
          OR: [{ email: input.email }, { username: input.username }],
        },
      });
      if (existingUsers.length > 0 && existingUsers[0]?.email === input.email)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exists",
        });
      if (
        existingUsers.length > 0 &&
        existingUsers[0]?.username === input.username
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already exists",
        });
      return await ctx.prisma.user.create({
        data: {
          email: input.email,
          username: input.username,
          name: `${input.firstName} ${input.lastName}`,
        },
      });
    },
  })
  .mutation("sendFeedback", {
    input: z.object({
      message: z.string(),
    }),
    async resolve({ input, ctx }) {
      const userInfo = userInfoToHtmlFromContext(ctx);

      const messageHtml = `
        <table>
          <tbody>
            <tr>
              <th>Message:</th>
              <td>${input.message}</td>
            </tr>
          </tbody>
        </table>`;

      const html = `
        <table>
          <tbody>
            <tr><td>${userInfo}</td></tr>
            <tr><td>---</td></tr>
            <tr><td>${messageHtml}</td></tr>
          </tbody>
        </table>`;

      console.log("SENDING EMAIL...");
      const response = await sendEmailHtml(env.SUPPORT_EMAIL, "Feedback", html);
      console.log("Response", response);
    },
  })
  .query("search", {
    input: z.object({
      query: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: input.query,
              },
            },
            {
              username: {
                contains: input.query.toLowerCase(),
              },
            },
            {
              name: {
                contains: input.query,
              },
            },
            {
              name: {
                contains: input.query.toLowerCase(),
              },
            },
          ],
        },
      });
    },
  })
  .query("get", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findUnique({
        where: { id: input.id },
        select: {
          id: true,
          name: true,
          username: true,
          teamPlayers: {
            include: {
              team: {
                include: {
                  event: true,
                },
              },
            },
          },
        },
      });
    },
  });

export const protectedUserRouter = createProtectedRouter()
  .mutation("update", {
    input: z.object({
      firstName: userCheckers.firstName.optional(),
      lastName: userCheckers.lastName.optional(),
      username: userCheckers.username.optional(),
      email: userCheckers.email.optional(),
    }),
    async resolve({ ctx, input }) {
      const users = await ctx.prisma.user.findMany({
        where: {
          id: {
            not: ctx.session.user.id,
          },
          OR: [
            { username: input.username },
            { email: input.email },
            { reservedEmail: input.email },
          ],
        },
      });
      const foundUser = users[0];
      if (foundUser !== undefined && foundUser.username === input.username)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken.",
        });
      if (
        foundUser !== undefined &&
        (foundUser.email === input.email ||
          foundUser.reservedEmail === input.email)
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already taken.",
        });
      return await ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: {
          username: input.username,
          name:
            input.firstName !== undefined && input.lastName !== undefined
              ? `${input.firstName} ${input.lastName}`
              : undefined,
        },
      });
    },
  })
  .query("get", {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
    },
  });
