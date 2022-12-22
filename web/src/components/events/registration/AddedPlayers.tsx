import { AddedGuest, AddedUser } from "./AddedPlayer";
import { usePlayersStore } from "./playerStore";

export default function AddedPlayers() {
  const { guests, users } = usePlayersStore((state) => ({
    guests: state.guests,
    users: state.users,
  }));

  return (
    <ul className="col center w-full">
      {users.map((u) => (
        <li key={u.id}>
          <AddedUser user={u} />
        </li>
      ))}
      {guests.map((g) => (
        <li key={g.name}>
          <AddedGuest guest={g} />
        </li>
      ))}
    </ul>
  );
}
