import DisplayFormError, { FormError } from "@/components/FormError";
import Button from "@/components/buttons/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProfileEditPage() {
  const { data: session } = useSession({ required: true });
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<FormError>(null);

  if (!session)
    return (
      <div className="buffer-y px-4">
        You must be signed in to edit your profile.
      </div>
    );

  return (
    <div className="buffer-y px-4">
      <form>
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
          <label>Username</label>
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
          <Button type="submit" className="primary">
            Update profile
          </Button>
        </div>
      </form>
    </div>
  );
}
