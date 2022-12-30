import { useSession } from "next-auth/react";
import { AddedGuest, AddedUser } from "./AddedPlayer";
import { usePlayersStore } from "./playerStore";

export default function AddedPlayers() {
  const { data: session } = useSession({ required: true });
  const { guests, users } = usePlayersStore((state) => ({
    guests: state.guests,
    users: state.users,
  }));

  return (
    <ul className="col center w-full">
      {!!session?.user && (
        <li className="w-full">
          <AddedUser user={session.user} readOnly={true} />
        </li>
      )}
      {users.map((u) => (
        <li key={u.id} className="w-full">
          <AddedUser user={u} />
        </li>
      ))}
      {guests.map((g) => (
        <li key={g.name} className="w-full">
          <AddedGuest guest={g} />
        </li>
      ))}
    </ul>
  );
}
