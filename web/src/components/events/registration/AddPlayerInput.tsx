import { useEffect, useState } from "react";
import { RegisteredUser, usePlayersStore } from "./playerStore";
import Button from "@/components/buttons/Button";
import DisplayFormError from "@/components/FormError";
import { trpc } from "@/utils/trpc";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

export default function AddPlayerInput() {
  const { data: session } = useSession({ required: true });
  const [input, setInput] = useState("");
  const searchQuery = trpc.useQuery(["user.search", { query: input }], {
    enabled: false,
  });
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const { error, addGuest, addUser, users } = usePlayersStore((state) => ({
    error: state.error,
    users: state.users,
    addGuest: state.addGuest,
    addUser: state.addUser,
  }));

  const addNewGuest = () => {
    addGuest({ name: input });
    setInput("");
  };
  const addNewUser = (user: RegisteredUser) => {
    addUser(user);
    setInput("");
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (input.length >= 2)
      timeout = setTimeout(() => searchQuery.refetch(), 500);
    return () => {
      if (timeout !== null) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    if (searchQuery.data !== undefined) {
      const validUsers = searchQuery.data.filter((u) => {
        const addedUserIds = users.map((u) => u.id);
        return !addedUserIds.includes(u.id) && u.id !== session?.user?.id;
      });
      setSearchResults(validUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery.data]);

  return (
    <div className="col center w-full">
      <DisplayFormError error={error} />
      <label>Player Full Name</label>
      <div className="row center w-full">
        <input
          type="text"
          placeholder="John Smith"
          value={input}
          className="w-full"
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="button" className="primary ml-1" onClick={addNewGuest}>
          Add
        </Button>
      </div>
      <ul className="w-full">
        {searchResults.map((u) => (
          <li
            key={u.id}
            className="col my-1 cursor-pointer rounded bg-primary-light p-2"
            onClick={() =>
              addNewUser({ id: u.id, name: u.name, username: u.username })
            }
          >
            <span>{u.name}</span>
            <span className="text-xs font-bold opacity-60">{u.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
