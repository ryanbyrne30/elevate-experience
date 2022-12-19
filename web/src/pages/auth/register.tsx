import DisplayFormError from "@/components/FormError";
import Button from "@/components/buttons/Button";
import { trpc } from "@/utils/trpc";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function RegisterPage() {
  const [error, setError] = useState<z.ZodError | null>(null);
  const { register, handleSubmit } = useForm();
  const registerMutation = trpc.useMutation(["user.register"]);

  const onSubmit = (data: FieldValues) => {
    const parseResult = z
      .object({
        firstName: z.string().min(1, "First name is required."),
        lastName: z.string().min(1, "Last name is required."),
        email: z.string().email(),
      })
      .safeParse(data);
    if (!parseResult.success) return setError(parseResult.error);
    const { email, firstName, lastName } = parseResult.data;
    registerMutation.mutate({
      email: email,
      name: firstName + " " + lastName,
    });
  };

  if (registerMutation.isSuccess) signIn();

  return (
    <div className="buffer-y">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <label>First name</label>
          <input
            required
            type="text"
            placeholder="John"
            {...register("firstName")}
          />
        </div>
        <div className="group">
          <label>Last name</label>
          <input
            required
            type="text"
            placeholder="Smith"
            {...register("lastName")}
          />
        </div>
        <div className="group">
          <label>Email</label>
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
  );
}
