import DisplayFormError from "@/components/FormError";
import PageHead from "@/components/PageHead";
import Button from "@/components/buttons/Button";
import { useRedirect } from "@/hooks/useRedirect";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPage() {
  const [credential, setCredential] = useState<string | null>(null);
  const [error, setError] = useState<z.ZodError | null>(null);
  const { register, handleSubmit } = useForm();
  const registerMutation = trpc.useMutation(["user.register"]);

  const onSubmit = (data: FieldValues) => {
    const parseResult = z
      .object({
        firstName: z.string().min(1, "First name is required."),
        lastName: z.string().min(1, "Last name is required."),
        email: z.string().email(),
        username: z
          .string()
          .regex(
            new RegExp("[a-zA-Z0-9_]+"),
            "Username requires alphanumeric characters or underscores"
          ),
      })
      .safeParse(data);
    if (!parseResult.success) return setError(parseResult.error);
    const { email, firstName, lastName, username } = parseResult.data;
    setCredential(email);
    registerMutation.mutate({
      email: email,
      firstName: firstName,
      lastName: lastName,
      username,
    });
  };

  useRedirect(
    registerMutation.isSuccess && credential !== null,
    "/auth/signIn"
  );

  return (
    <>
      <PageHead
        title="Create Account"
        description="Create your Elevate Experience profile today and start attending the best events in your area."
      />
      <div className="buffer-y">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center">Create Your Account</h1>
          <div className="group">
            <label className="required">First Name</label>
            <input
              required
              type="text"
              placeholder="John"
              {...register("firstName")}
            />
          </div>
          <div className="group">
            <label className="required">Last Name</label>
            <input
              required
              type="text"
              placeholder="Smith"
              {...register("lastName")}
            />
          </div>
          <div className="group">
            <label className="required">Display Name</label>
            <input
              required
              type="text"
              placeholder="John_Smith13"
              {...register("username")}
            />
          </div>
          <div className="group">
            <label className="required">Email</label>
            <input
              required
              type="email"
              placeholder="john.smith@example.com"
              {...register("email")}
            />
          </div>
          <div className="group">
            <DisplayFormError error={error} />
            <DisplayFormError error={registerMutation.error} />
          </div>
          <div className="group">
            <Button
              className="primary"
              isLoading={registerMutation.isLoading}
              loadingMessage="Creating profile..."
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
