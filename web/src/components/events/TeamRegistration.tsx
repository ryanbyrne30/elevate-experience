import { Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import CloseIcon from "../icons/CloseIcon";

type Player = { id?: string; name: string };
type PlayersStore = {
  maxPlayers: number;
  players: Player[];
  setMaxPlayers: (max: number) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (name: string) => void;
};

const usePlayersStore = create(
  immer<PlayersStore>((set) => ({
    maxPlayers: 1,
    players: [],
    setMaxPlayers: (max) =>
      set((state) => {
        state.maxPlayers = max;
      }),
    addPlayer: (player) =>
      set((state) => {
        if (state.players.findIndex((p) => p.name === player.name) !== -1)
          throw "Player names must be unique.";
        if (state.players.length >= state.maxPlayers)
          throw "Max number of players has been met.";
        state.players.push(player);
      }),
    removePlayer: (name) =>
      set((state) => {
        const index = state.players.findIndex((p) => p.name === name);
        if (index !== -1) state.players.splice(index, 1);
      }),
  }))
);

function AddedPlayer({
  player,
  readOnly,
}: {
  player: Player;
  readOnly?: boolean;
}) {
  const { removePlayer } = usePlayersStore((state) => ({
    removePlayer: state.removePlayer,
  }));

  return (
    <div className="row center w-full justify-between rounded bg-primary-light p-2 shadow-md">
      <span>{player.name}</span>
      {!readOnly && (
        <CloseIcon
          className="cursor-pointer text-xl text-error"
          onClick={() => removePlayer(player.name)}
        />
      )}
    </div>
  );
}

export default function TeamRegistration({ event }: { event?: Event }) {
  const [input, setInput] = useState<string>("");
  const { data: session, status } = useSession({ required: true });
  const { players, setMaxPlayers, addPlayer } = usePlayersStore((state) => ({
    players: state.players,
    addPlayer: state.addPlayer,
    setMaxPlayers: state.setMaxPlayers,
  }));

  const addNewPlayer = () => {
    try {
      const trimmed = input.trim();
      if (trimmed.length) {
        addPlayer({
          name: trimmed,
        });
        setInput("");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    if (event !== undefined) setMaxPlayers(event.teamSize - 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event?.teamSize]);

  if (status === "loading" || event === undefined) return <div>Loading...</div>;

  return (
    <div className="col center w-full">
      <div className="group">
        <span>
          Team ({players.length + 1}/{event.teamSize})
        </span>
        <ol className="w-full">
          <li className="my-2">
            <AddedPlayer
              readOnly={true}
              player={{
                name: session.user?.name || session.user?.email || "",
              }}
            />
          </li>
          {players.map((p, idx) => (
            <li key={idx} className="my-2">
              <AddedPlayer player={p} />
            </li>
          ))}
        </ol>
      </div>
      {players.length + 1 < event.teamSize && (
        <div className="group">
          <label>Player Full Name</label>
          <div className="row center">
            <input
              type="text"
              placeholder="John Smith"
              value={input}
              onChange={(e) => setInput(e.currentTarget.value)}
            />
            <Button className="primary ml-1" onClick={addNewPlayer}>
              Add
            </Button>
          </div>
        </div>
      )}
      {players.length + 1 === event.teamSize && (
        <Button type="submit" className="primary">
          Register
        </Button>
      )}
    </div>
  );
}
