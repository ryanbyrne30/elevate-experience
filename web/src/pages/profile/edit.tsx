import DisplayFormError, { FormError } from "@/components/FormError";
import Button from "@/components/buttons/Button";
import { useRedirect } from "@/hooks/useRedirect";
import { trpc } from "@/utils/trpc";
import { userCheckers } from "@/utils/zodCheckers/user";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function ProfileEditPage() {
  const { data: session } = useSession({ required: true });
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<FormError>(null);
  const updateMutation = trpc.useMutation(["protectedUser.update"]);

  const onSubmit = (data: FieldValues) => {
    setError(null);
    if (!session?.user) return setError("Must be signed in to update.");

    const parseResult = z
      .object({
        firstName: userCheckers.firstName,
        lastName: userCheckers.lastName,
        username: userCheckers.username,
        email: userCheckers.email,
      })
      .safeParse(data);
    if (!parseResult.success) return setError(parseResult.error);
    updateMutation.mutate(parseResult.data);
  };

  useRedirect(updateMutation.isSuccess, "/profile");

  if (!session)
    return (
      <div className="buffer-y px-4">
        You must be signed in to edit your profile.
      </div>
    );

  return (
    <div className="buffer-y px-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <h1>Edit Profile</h1>
        </div>
        <div className="group">
          <label>First Name</label>
          <input
            defaultValue={session.user?.name.split(" ")[0]}
            {...register("firstName")}
          />
        </div>
        <div className="group">
          <label>Last Name</label>
          <input
            defaultValue={session.user?.name.split(" ")[1]}
            {...register("lastName")}
          />
        </div>
        <div className="group">
          <label>Display Name</label>
          <input
            defaultValue={session.user?.username}
            {...register("username")}
          />
        </div>
        <div className="group">
          <label>Email</label>
          <input defaultValue={session.user?.email} {...register("email")} />
        </div>
        <DisplayFormError error={error} />
        <div className="group">
          <Button
            type="submit"
            className="primary"
            isLoading={updateMutation.isLoading}
            loadingMessage="Updating profile..."
          >
            Update profile
          </Button>
        </div>
      </form>
    </div>
  );
}
