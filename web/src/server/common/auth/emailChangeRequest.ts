import { env } from "@/env/server.mjs";
import { Context } from "../../router/context";
import { sendEmailHtml } from "@/utils/email";
import { randomString } from "@/utils/random";

function emailChangeHtml(toEmail: string, token: string) {
  return `
    <body style="background: white;">
      <table width="100%" border="0" cellspacing="20" cellpadding="0"
        style="background: white; max-width: 600px; margin: auto; border-radius: 10px;">
        <tr>
          <td align="center"
            style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${"black"};">
            Confirm change of email for <strong>${env.NEXTAUTH_URL}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding: 20px 0;">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center" style="border-radius: 5px;" bgcolor="${"navy"}"><a href="${`${env.NEXTAUTH_URL}/auth/confirmEmailChange?email=${toEmail}&token=${token}`}"
                    target="_blank"
                    style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${"white"}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${"white"}; display: inline-block; font-weight: bold;">Sign
                    in</a></td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center"
            style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${"white"};">
            If you did not request this email you can safely ignore it.
          </td>
        </tr>
      </table>
    </body>
  `;
}

async function createVerificationToken(email: string, ctx: Context) {
  const token = randomString(60);
  const curDate = new Date();
  const expirationMS =
    curDate.getTime() + env.VERIFY_EXPIRATION_MIN * 60 * 1000;
  const expirationDate = new Date(expirationMS);

  await ctx.prisma.verificationToken.create({
    data: {
      expires: expirationDate,
      identifier: email,
      token,
    },
  });
  return token;
}

export async function handleEmailChangeRequest(toEmail: string, ctx: Context) {
  const user = ctx.session?.user;
  if (user === undefined) throw "User is undefined";
  const token = await createVerificationToken(toEmail, ctx);

  await sendEmailHtml(
    toEmail,
    "Confirm Email Change",
    emailChangeHtml(toEmail, token)
  );
}
