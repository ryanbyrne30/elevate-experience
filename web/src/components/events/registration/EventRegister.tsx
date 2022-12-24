import { FormEvent, useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";
import { EventDetails } from "@/types/event";
import { useSession } from "next-auth/react";
import SignInButton from "@/components/buttons/SignInButton";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "@/env/client.mjs";
import { useParam } from "@/hooks/useParam";
import AddPlayerInput from "./AddPlayerInput";
import AddedPlayers from "./AddedPlayers";
import { usePlayersStore } from "./playerStore";
import Button from "@/components/buttons/Button";
import DisplayFormError, { FormError } from "@/components/FormError";

export default function EventRegister({ event }: { event?: EventDetails }) {
  const stripeStatus = useParam("status");
  const [error, setError] = useState<FormError>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession({ required: true });
  const { guests, users, maxPlayers, setMaxPlayers } = usePlayersStore(
    (state) => ({
      guests: state.guests,
      users: state.users,
      maxPlayers: state.maxPlayers,
      setMaxPlayers: state.setMaxPlayers,
    })
  );

  const registerMutation = trpc.useMutation(["protectedEvents.register"]);
  const unregisterMutation = trpc.useMutation(["protectedEvents.unregister"]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!session?.user) return setError("Must be signed in to register.");
    if (event === undefined) return setError("Event is undefined.");
    if (guests.length + users.length + 1 < maxPlayers)
      return setError("Add more players to your team.");
    if (guests.length + users.length + 1 > maxPlayers)
      return setError("Too many players on team.");
    registerMutation.mutate({
      eventId: event.id,
      guests: guests.map((g) => g.name),
      userIds: [...users.map((u) => u.id)],
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
      <div className="group">
        <span className="text-sm">{event?.name}</span>
        <h1>Register Team</h1>
      </div>
      <div className="group">
        <label>
          Players ({1 + guests.length + users.length}/{maxPlayers})
        </label>
        <AddedPlayers />
      </div>
      <DisplayFormError error={error} />
      <DisplayFormError error={registerMutation.error} />
      <DisplayFormError error={unregisterMutation.error} />
      {guests.length + users.length + 1 >= maxPlayers ? (
        <Button
          type="submit"
          className="primary"
          isLoading={loading || registerMutation.isLoading}
          loadingMessage="Registering team..."
        >
          Register
        </Button>
      ) : (
        <AddPlayerInput />
      )}
    </form>
  );

  // return (
  //   <form onSubmit={onSubmit}>
  //     <div className="center group">
  //       <span className="font-condensed text-lg">Register for</span>
  //       {event === undefined ? (
  //         <h1 className="loading-lg loading-parent my-1 w-60" />
  //       ) : (
  //         <h1>{event?.name}</h1>
  //       )}
  //     </div>
  //     <div className="col center w-full">
  //       <div className="group">
  //         <span>
  //           Team{" "}
  //           {event !== undefined && `(${players.length + 1}/${event.teamSize})`}
  //         </span>
  //         <RegisteredPlayers />
  //       </div>
  //       <div className="group">
  //         <FormError error={registerMutation.error} />
  //       </div>
  //       <div className="group">
  //         <RegisterPlayerInput />
  //         {event?.teamSize && players.length + 1 === event.teamSize && (
  //           <Button
  //             type="submit"
  //             className="primary"
  //             isLoading={registerMutation.isLoading || loading}
  //             loadingMessage="Registering team..."
  //           >
  //             Register
  //           </Button>
  //         )}
  //       </div>
  //     </div>
  //   </form>
  // );
}
