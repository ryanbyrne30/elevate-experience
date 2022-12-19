import { useSession } from "next-auth/react";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import CloseIcon from "../../icons/CloseIcon";
import Button from "../../buttons/Button";
import { useState } from "react";

type Player = { id?: string; name: string };
type PlayersStore = {
  maxPlayers: number;
  players: Player[];
  setMaxPlayers: (max: number) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (name: string) => void;
};

export const usePlayersStore = create(
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

export function RegisteredPlayer({
  player,
  readOnly,
}: {
  player?: Player;
  readOnly?: boolean;
}) {
  const { removePlayer } = usePlayersStore((state) => ({
    removePlayer: state.removePlayer,
  }));

  if (!player)
    return (
      <div className="loading-parent row center w-full justify-between rounded bg-primary-light p-2 shadow-md">
        <div className="loading-md w-20 bg-primary" />
      </div>
    );

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

export function RegisteredPlayers() {
  const { data: session } = useSession({ required: true });
  const { players } = usePlayersStore((state) => ({
    players: state.players,
  }));

  const username = session?.user?.name || session?.user?.email;

  return (
    <ol className="w-full">
      <li className="my-2">
        <RegisteredPlayer
          readOnly={true}
          player={username ? { name: username } : undefined}
        />
      </li>
      {players.map((p, idx) => (
        <li key={idx} className="my-2">
          <RegisteredPlayer player={p} />
        </li>
      ))}
    </ol>
  );
}

export function RegisterPlayerInput() {
  const [input, setInput] = useState<string>("");
  const { players, maxPlayers, addPlayer } = usePlayersStore((state) => ({
    players: state.players,
    maxPlayers: state.maxPlayers,
    addPlayer: state.addPlayer,
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

  if (players.length >= maxPlayers) return null;

  return (
    <div className="col">
      <label>Player full name</label>
      <div className="row center w-full">
        <input
          type="text"
          placeholder="John Smith"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="button" className="primary ml-1" onClick={addNewPlayer}>
          Add
        </Button>
      </div>
    </div>
  );
}
