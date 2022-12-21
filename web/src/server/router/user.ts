import { z } from "zod";
import { createRouter } from "./context";
import { TRPCError } from "@trpc/server";
import { sendEmailHtml, userInfoToHtmlFromContext } from "@/utils/email";
import { env } from "@/env/server.mjs";

export const userRouter = createRouter()
  .mutation("register", {
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
  });
