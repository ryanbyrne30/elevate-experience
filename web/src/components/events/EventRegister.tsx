import { Event } from "@prisma/client";
import {
  RegisterPlayerInput,
  RegisteredPlayers,
  usePlayersStore,
} from "./TeamRegistration";
import Button from "../buttons/Button";
import { FormEvent, useEffect } from "react";

export default function EventRegister({ event }: { event?: Event }) {
  const { players, setMaxPlayers } = usePlayersStore((state) => ({
    players: state.players,
    setMaxPlayers: state.setMaxPlayers,
  }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Submitted");
  };

  useEffect(() => {
    if (event !== undefined) setMaxPlayers(event.teamSize - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.teamSize]);

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
          <RegisterPlayerInput />
          {event?.teamSize && players.length + 1 === event.teamSize && (
            <Button type="submit" className="primary">
              Register
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
