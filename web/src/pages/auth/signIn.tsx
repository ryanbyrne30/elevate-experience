import DisplayFormError, { FormError } from "@/components/FormError";
import Button from "@/components/buttons/Button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInPage() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<FormError>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    const parseResult = z
      .object({
        email: z.string().email(),
      })
      .safeParse(data);

    if (!parseResult.success) setError(parseResult.error);
    else
      await signIn("email", {
        email: parseResult.data.email,
        callbackUrl: "/",
      });
    setLoading(false);
  };

  return (
    <div className="buffer-y">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center">Sign In to Your Account</h1>
        <div className="group">
          <label className="required">Email</label>
          <input type="email" {...register("email")} required />
        </div>
        <DisplayFormError error={error} />
        <div className="group">
          <Button
            type="submit"
            className="primary"
            isLoading={loading}
            loadingMessage="Signing In..."
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
