import { Division, Event } from "@prisma/client";
import AddPlayerInput from "../events/registration/AddPlayerInput";
import AddedPlayers from "../events/registration/AddedPlayers";
import { usePlayersStore } from "../events/registration/playerStore";
import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import { trpc } from "@/utils/trpc";
import DisplayFormError, { FormError } from "../FormError";
import { useParam } from "@/hooks/useParam";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env/client.mjs";
import SignInButton from "../buttons/SignInButton";
import { useSession } from "next-auth/react";
import { useRedirect } from "@/hooks/useRedirect";

function Loader() {
  return <span>Loading...</span>;
}

function Cell({ division }: { division: Division & { event: Event } }) {
  const { data: session } = useSession({ required: true });
  const stripeStatus = useParam("status");
  const [error, setError] = useState<FormError>(null);
  const [loading, setLoading] = useState(false);
  const { setMaxPlayers, guests, users } = usePlayersStore((state) => ({
    setMaxPlayers: state.setMaxPlayers,
    guests: state.guests,
    users: state.users,
  }));
  const registerMutation = trpc.useMutation(["protectedDivisions.register"]);
  const unregisterMutation = trpc.useMutation([
    "protectedDivisions.unregister",
  ]);

  const doRegister = () => {
    if (guests.length + users.length + 1 !== division.teamSize)
      return setError("Invalid team size.");
    registerMutation.mutate({
      divisionId: division.id,
      guests: guests.map((g) => g.name),
      userIds: users.map((u) => u.id),
    });
  };

  const makePayment = async (sessionId: string) => {
    setLoading(true);
    const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);
    const result = await stripe?.redirectToCheckout({
      sessionId,
    });
    if (result?.error) {
      console.error(result.error);
      alert(result.error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setMaxPlayers(division.teamSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [division.teamSize]);

  useEffect(() => {
    if (stripeStatus === "success")
      window.location.replace(`/events/${division.event.id}`);
    else if (stripeStatus === "cancel")
      unregisterMutation.mutate({
        divisionId: division.id,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeStatus]);

  useEffect(() => {
    if (registerMutation.isSuccess && registerMutation.data.sessionId)
      makePayment(registerMutation.data.sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerMutation.isSuccess]);

  useRedirect(unregisterMutation.isSuccess, `/events/${division.eventId}`);

  if (session === null)
    return (
      <div className="col center">
        <span className="my-2">You must sign in to register.</span>
        <SignInButton />
      </div>
    );

  return (
    <div className="col center w-full">
      <span className="meta">{`${division.event.name} - ${division.name}`}</span>
      <h1>Register</h1>
      <div className="form">
        <div className="group">
          <label>Your Team</label>
          <AddedPlayers />
        </div>
        <DisplayFormError error={error} />
        <DisplayFormError error={registerMutation.error} />
        <div className="group">
          {guests.length + users.length + 1 >= division.teamSize ? (
            <Button
              type="button"
              className="primary"
              onClick={doRegister}
              isLoading={
                registerMutation.isLoading ||
                unregisterMutation.isLoading ||
                loading
              }
              loadingMessage="Registering team..."
            >
              Register
            </Button>
          ) : (
            <AddPlayerInput />
          )}
        </div>
      </div>
    </div>
  );
}

export default function DivisionRegister({
  division,
}: {
  division?: Division & {
    event: Event;
  };
}) {
  if (division === undefined) return <Loader />;
  return <Cell division={division} />;
}
