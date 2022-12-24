import { useEffect, useState } from "react";
import { RegisteredUser, usePlayersStore } from "./playerStore";
import Button from "@/components/buttons/Button";
import DisplayFormError from "@/components/FormError";
import { trpc } from "@/utils/trpc";

export default function AddPlayerInput() {
  const [input, setInput] = useState("");
  const searchQuery = trpc.useQuery(["user.search", { query: input }], {
    enabled: false,
  });

  const { error, addGuest, addUser } = usePlayersStore((state) => ({
    error: state.error,
    guests: state.guests,
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

  return (
    <div className="col center">
      <DisplayFormError error={error} />
      <div className="row center w-full">
        <input
          type="text"
          placeholder="John Smith"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <Button type="button" className="primary ml-1" onClick={addNewGuest}>
          Add
        </Button>
      </div>
      <ul className="w-full">
        {searchQuery.data?.map((u) => (
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
