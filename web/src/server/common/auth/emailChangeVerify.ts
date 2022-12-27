import { Context } from "@/server/router/context";
import { TRPCError } from "@trpc/server";

async function updateEmail(userId: string, toEmail: string, ctx: Context) {
  await ctx.prisma.$transaction([
    ctx.prisma.verificationToken.deleteMany({
      where: { identifier: toEmail },
    }),
    ctx.prisma.user.update({
      where: { id: userId },
      data: {
        reservedEmail: null,
        email: toEmail,
      },
    }),
  ]);
}

export async function handleEmailChangeVerification(
  toEmail: string,
  token: string,
  ctx: Context
) {
  const [verificationToken, user] = await ctx.prisma.$transaction([
    ctx.prisma.verificationToken.findUniqueOrThrow({
      where: {
        identifier_token: {
          identifier: toEmail,
          token,
        },
      },
    }),
    ctx.prisma.user.findFirst({
      where: {
        reservedEmail: toEmail,
      },
    }),
  ]);
  if (verificationToken.expires < new Date())
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Token expired.",
    });
  if (user === null || user.id !== ctx.session?.user?.id)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User did not authorize a change of email.",
    });

  await updateEmail(user.id, toEmail, ctx);
}
