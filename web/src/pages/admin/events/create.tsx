import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormError from "@/components/FormError";
import { useRedirect } from "@/hooks/useRedirect";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function AdminEventCreatePage() {
  const createMutation = trpc.useMutation("events.create");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string | z.ZodError | undefined>(
    undefined
  );

  const onSubmit = (data: FieldValues) => {
    const result = z
      .object({
        name: z.string(),
        description: z.string(),
        location: z.string(),
        date: z.string().transform((d) => new Date(Date.parse(d))),
      })
      .safeParse(data);

    if (!result.success) return setError(result.error);
    createMutation.mutate(result.data);
  };

  useRedirect(createMutation.isSuccess, "/admin/events");
  console.log(createMutation.isSuccess);

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-center">Create New Event</h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="group">
          <label className="required">Name</label>
          <input
            type="text"
            placeholder="My Awesome Event"
            required
            {...register("name")}
          />
        </div>
        <div className="group">
          <label className="required">Date</label>
          <input type="datetime-local" required {...register("date")} />
        </div>
        <div className="group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Neptune State Park"
            {...register("location")}
          />
        </div>
        <div className="group">
          <label>Description</label>
          <textarea
            placeholder="Doubles tournament..."
            {...register("description")}
          />
        </div>
        <div className="group">
          <FormError error={error} />
          <FormError error={createMutation.error?.message} />
        </div>
        <div>
          <PrimaryButton
            isLoading={createMutation.isLoading}
            loadingMessage="Creating Event..."
          >
            Create Event
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
