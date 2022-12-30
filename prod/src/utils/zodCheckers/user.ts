import { z } from "zod";

export const userCheckers = {
  email: z.string().email(),
  firstName: z
    .string()
    .min(1)
    .max(20)
    .regex(new RegExp(/^[a-zA-Z]+$/), "First name must contain only letters."),
  lastName: z
    .string()
    .min(1)
    .max(25)
    .regex(new RegExp(/^[a-zA-Z]+$/), "First name must contain only letters."),
  username: z
    .string()
    .min(1)
    .max(20)
    .regex(
      new RegExp("[a-zA-Z0-9_]+"),
      "Username must only contain alphanumeric characters and underscores."
    ),
};
