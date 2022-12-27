import DisplayFormError, { FormError } from "@/components/FormError";
import PageHead from "@/components/PageHead";
import Socials from "@/components/Socials";
import Button from "@/components/buttons/Button";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

export default function ContactPage() {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState<FormError>(null);
  const sendMutation = trpc.useMutation(["user.sendFeedback"]);

  const onSubmit = (data: FieldValues) => {
    const parseResult = z
      .object({
        message: z.string().min(1, "Cannot send an empty message."),
      })
      .safeParse(data);
    if (!parseResult.success) return setError(parseResult.error);
    sendMutation.mutate({ message: parseResult.data.message });
  };

  if (sendMutation.isSuccess) {
    reset();
    alert("Thank you for your feedback!");
    sendMutation.reset();
    window.location.reload();
  }

  return (
    <>
      <PageHead
        title="Contact Us"
        description="Reach out to Elevate Experience and let us know of any questions or comments you have."
      />
      <div className="buffer-t col center min-h-screen w-full justify-between px-4">
        <h1 className="mb-4 text-center">We&apos;d Love to Hear From You!</h1>
        <ul className="my-4 italic">
          <li>Have a birthday coming up?</li>
          <li>Something you&apos;d like to see?</li>
          <li>Things we can improve on?</li>
          <li>Just want to say hi?</li>
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="font-condensed my-4 text-2xl font-bold">
            Hit us up!
          </span>
          <Socials />
          <div className="group">
            <label className="required">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Give us some feedback..."
              {...register("message")}
            />
          </div>
          <DisplayFormError error={error} />
          <DisplayFormError error={sendMutation.error} />
          <div className="group">
            <Button
              className="primary"
              type="submit"
              isLoading={sendMutation.isLoading}
              loadingMessage="Sending message..."
            >
              Send message
            </Button>
          </div>
        </form>
        <div className="col center h-40 w-screen justify-center bg-gray-900 p-4 text-gray-300">
          <span className="font-condensed text-xl font-thin">
            Need support?
          </span>
          <Link href="mailto: support@elevateexperience.app">
            <span className="cursor-pointer underline">
              support@elevateexperience.app
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
