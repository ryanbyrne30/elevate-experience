import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import DisplayFormError, { FormError } from "../FormError";
import Button from "../buttons/Button";
import { useState } from "react";
import { User } from "@prisma/client";
import { userCheckers } from "@/utils/zodCheckers/user";
import { trpc } from "@/utils/trpc";
import { z } from "zod";
import { useRedirect } from "@/hooks/useRedirect";

function Loader() {
  return (
    <div className="form loading-parent">
      <div className="group">
        <h1>Edit Profile</h1>
      </div>
      <div className="group w-full">
        <div className="col w-full">
          <div className="loading-md w-20" />
          <div className="loading-md w-40" />
        </div>
      </div>
      <div className="group w-full">
        <div className="col w-full">
          <div className="loading-md w-20" />
          <div className="loading-md w-40" />
        </div>
      </div>
      <div className="group w-full">
        <div className="col w-full">
          <div className="loading-md w-20" />
          <div className="loading-md w-40" />
        </div>
      </div>
    </div>
  );
}

function Cell({ user }: { user: User }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<FormError>(null);
  const updateMutation = trpc.useMutation(["protectedUser.update"]);

  const onSubmit = (data: FieldValues) => {
    setError(null);
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

  useRedirect(updateMutation.isSuccess, `/profile/${user.id}`);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="group">
        <h1>Edit Profile</h1>
      </div>
      <div className="group">
        <label>First Name</label>
        <input
          defaultValue={user.name.split(" ")[0]}
          {...register("firstName")}
        />
      </div>
      <div className="group">
        <label>Last Name</label>
        <input
          defaultValue={user.name.split(" ")[1]}
          {...register("lastName")}
        />
      </div>
      <div className="group">
        <label>Display Name</label>
        <input defaultValue={user.username} {...register("username")} />
      </div>
      <div className="group">
        <label>Email</label>
        <input defaultValue={user.email} {...register("email")} />
      </div>
      <DisplayFormError error={error} />
      <DisplayFormError error={updateMutation.error} />
      <div className="group">
        <Button
          type="submit"
          className="primary"
          isLoading={updateMutation.isLoading}
          loadingMessage="Updating profile..."
        >
          Update profile
        </Button>
        <div className="p-2"></div>
        <Button
          type="button"
          className="secondary"
          href={`/profile/${user.id}`}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function EditProfile() {
  const { data: session } = useSession({ required: true });
  const getQuery = trpc.useQuery(["protectedUser.get"]);

  if (session === null || getQuery.isLoading) return <Loader />;
  if (!getQuery.data)
    return (
      <div className="buffer-y">You must be logged in to edit profile.</div>
    );
  return <Cell user={getQuery.data} />;
}
