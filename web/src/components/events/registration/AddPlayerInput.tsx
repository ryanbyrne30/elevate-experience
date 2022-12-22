import { useState } from "react";
import { usePlayersStore } from "./playerStore";
import Button from "@/components/buttons/Button";
import DisplayFormError, { FormError } from "@/components/FormError";

export default function AddPlayerInput() {
  const [input, setInput] = useState("");

  const { error, guests, users, addGuest, addUser } = usePlayersStore(
    (state) => ({
      error: state.error,
      guests: state.guests,
      users: state.users,
      addGuest: state.addGuest,
      addUser: state.addUser,
    })
  );

  const addNewGuest = () => addGuest({ name: input });
  // const addNewUser = () => {};

  const addNewPlayer = () => {
    // try {
    //   const trimmed = input.trim();
    //   if (trimmed.length) {
    //     addPlayer({
    //       name: trimmed,
    //     });
    //     setInput("");
    //   }
    // } catch (err) {
    //   alert(err);
    // }
  };

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
        <Button
          type="button"
          className="primary ml-1"
          onClick={() => addGuest({ name: input })}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
