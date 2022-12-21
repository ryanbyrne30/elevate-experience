import { env } from "@/env/server.mjs";
import { createTransport } from "nodemailer";
import { Context } from "@/server/router/context";

const transporter = createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  auth: {
    user: env.EMAIL_FROM,
    pass: env.EMAIL_PASSWORD,
  },
});

export const userInfoToStringFromContext = (ctx: Context) => {
  const user = ctx.session?.user;
  if (user) {
    const userInfo = `
Id: ${user.id}
Name: ${user.name}
Email: ${user.email}`;
    return userInfo.trim();
  }
  return "No user info. User not signed in.";
};

export const userInfoToHtmlFromContext = (ctx: Context) => {
  const user = ctx.session?.user;
  if (user) {
    const userInfo = `
      <table>
        <tbody>
          <tr>
            <th>Id:</th>
            <td>${user.id}</td>
          </tr>
          <tr>
            <th>Name:</th>
            <td>${user.name}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>${user.email}</td>
          </tr>
        </tbody>
      </table>`;
    return userInfo.trim();
  }
  return "No user info. User not signed in.";
};

export const sendEmailText = async (
  to: string,
  subject: string,
  message: string
) => {
  return await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text: message,
  });
};

export const sendEmailHtml = async (
  to: string,
  subject: string,
  html: string
) => {
  return await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });
};
