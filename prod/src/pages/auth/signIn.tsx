import DisplayFormError, { FormError } from "@/components/FormError";
import PageHead from "@/components/PageHead";
import Button from "@/components/buttons/Button";
import { useParam } from "@/hooks/useParam";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInPage() {
  const { register, handleSubmit } = useForm();
  const errorCode = useParam("error");
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
    <>
      <PageHead title="Sign In" description="Sign in to Elevate Experience." />
      <div className="buffer-y">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-center">Sign In to Your Account</h1>
          <div className="group">
            <label className="required">Email</label>
            <input type="email" {...register("email")} required />
          </div>
          <DisplayFormError error={error} />
          <DisplayFormError error={errorCode} />
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
        <div className="group">
          <span className="meta">Don&apos;t have an account?</span>
          <Link href="/auth/register">
            <span className="cursor-pointer italic underline">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
