import DisplayFormError from "@/components/FormError";
import PageHead from "@/components/PageHead";
import { useParam } from "@/hooks/useParam";
import { useRedirect } from "@/hooks/useRedirect";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ConfirmEmailChange() {
  const { data: session } = useSession();
  const email = useParam("email");
  const token = useParam("token");
  const verifyMutation = trpc.useMutation(["protectedUser.verifyEmail"]);

  useEffect(() => {
    if (email !== undefined && token !== undefined)
      verifyMutation.mutate({
        email,
        token,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, token]);

  useRedirect(verifyMutation.isSuccess, `/profile/${session?.user?.id}`);

  useEffect(() => {
    if (verifyMutation.isError) {
      const timeout = setTimeout(
        () => window.location.replace("/profile/edit"),
        3000
      );
      return () => clearTimeout(timeout);
    }
  }, [verifyMutation.isError]);

  if (verifyMutation.isError)
    return (
      <>
        <PageHead
          title="Email Not Confirmed"
          description="Your email has not been changed for your Elevate Experience profile."
        />

        <div className="col center buffer-y">
          <div className="group">
            <h1>Could not change email.</h1>
          </div>
          <div className="group">
            <DisplayFormError error={verifyMutation.error} />
          </div>
        </div>
      </>
    );

  return (
    <>
      <PageHead
        title="Confirming email..."
        description="Confirming your email..."
      />
      <div className="loading-parent buffer-y col center">
        <h1>Changing email...</h1>
      </div>
    </>
  );
}
