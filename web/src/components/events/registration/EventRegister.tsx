import {
  RegisterPlayerInput,
  RegisteredPlayers,
  usePlayersStore,
} from "./TeamRegistration";
import Button from "../../buttons/Button";
import { FormEvent, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import FormError from "../../FormError";
import { EventDetails } from "@/types/event";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/buttons/SignInButton";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env/client.mjs";
import { useParam } from "@/hooks/useParam";

export default function EventRegister({ event }: { event?: EventDetails }) {
  const stripeStatus = useParam("status");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession({ required: true });
  const { players, setMaxPlayers } = usePlayersStore((state) => ({
    players: state.players,
    setMaxPlayers: state.setMaxPlayers,
  }));
  const registerMutation = trpc.useMutation(["protectedEvents.register"]);
  const unregisterMutation = trpc.useMutation(["protectedEvents.unregister"]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (event === undefined) throw "No event given.";
    const guests = players
      .map((p) => {
        return p.id === undefined ? p.name : null;
      })
      .filter((g) => g !== null) as string[];
    const userIds = players
      .map((p) => p.id)
      .filter((uid) => uid !== undefined) as string[];
    registerMutation.mutate({
      eventId: event.id,
      guests,
      userIds,
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
    console.log(event, stripeStatus);
    if (event === undefined) return;
    if (stripeStatus === "cancel")
      unregisterMutation.mutate({
        eventId: event.id,
      });
    if (stripeStatus === "success" || unregisterMutation.isSuccess)
      window.location.replace(`/events/${event.id}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, stripeStatus, unregisterMutation.isSuccess]);

  useEffect(() => {
    if (registerMutation.isSuccess && registerMutation.data.sessionId)
      makePayment(registerMutation.data.sessionId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerMutation.isSuccess]);

  useEffect(() => {
    if (event !== undefined) setMaxPlayers(event.teamSize - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.teamSize]);

  if (session === null)
    return (
      <div className="col center">
        <span className="my-2">You must sign in to register.</span>
        <SignInButton />
      </div>
    );

  return (
    <form onSubmit={onSubmit}>
      <div className="center group">
        <span className="font-condensed text-lg">Register for</span>
        {event === undefined ? (
          <h1 className="loading-lg loading-parent my-1 w-60" />
        ) : (
          <h1>{event?.name}</h1>
        )}
      </div>
      <div className="col center w-full">
        <div className="group">
          <span>
            Team{" "}
            {event !== undefined && `(${players.length + 1}/${event.teamSize})`}
          </span>
          <RegisteredPlayers />
        </div>
        <div className="group">
          <FormError error={registerMutation.error} />
        </div>
        <div className="group">
          <RegisterPlayerInput />
          {event?.teamSize && players.length + 1 === event.teamSize && (
            <Button
              type="submit"
              className="primary"
              isLoading={registerMutation.isLoading || loading}
              loadingMessage="Registering team..."
            >
              Register
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
