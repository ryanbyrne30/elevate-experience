import {
  RegisterPlayerInput,
  RegisteredPlayers,
  usePlayersStore,
} from "./TeamRegistration";
import Button from "../../buttons/Button";
import { FormEvent, useEffect } from "react";
import { trpc } from "@/utils/trpc";
import FormError from "../../FormError";
import { useRedirect } from "@/hooks/useRedirect";
import { EventDetails } from "@/types/event";

export default function EventRegister({ event }: { event?: EventDetails }) {
  const { players, setMaxPlayers } = usePlayersStore((state) => ({
    players: state.players,
    setMaxPlayers: state.setMaxPlayers,
  }));
  const registerMutation = trpc.useMutation(["protectedEvents.register"]);

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

  useEffect(() => {
    if (event !== undefined) setMaxPlayers(event.teamSize - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.teamSize]);

  useRedirect(registerMutation.isSuccess, `/events/${event?.id}`);

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
              isLoading={registerMutation.isLoading}
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
