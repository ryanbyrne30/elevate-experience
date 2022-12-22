import { ReactNode } from "react";
import { RegisteredGuest, RegisteredUser } from "./playerStore";

function AddedPlayer({ children }: { children: ReactNode }) {
  return <div className="w-full p-4">{children}</div>;
}

export function AddedUser({ user }: { user: RegisteredUser }) {
  return <AddedPlayer>{user.name}</AddedPlayer>;
}

export function AddedGuest({ guest }: { guest: RegisteredGuest }) {
  return <AddedPlayer>{guest.name}</AddedPlayer>;
}
