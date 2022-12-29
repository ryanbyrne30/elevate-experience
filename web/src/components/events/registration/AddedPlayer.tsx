import { ReactNode } from "react";
import {
  RegisteredGuest,
  RegisteredUser,
  usePlayersStore,
} from "./playerStore";
import CloseIcon from "@/components/icons/CloseIcon";
import Link from "next/link";

function AddedPlayer({
  children,
  onRemove,
  readOnly,
}: {
  children: ReactNode;
  onRemove: () => void;
  readOnly?: boolean;
}) {
  return (
    <div className="row center my-1 w-full justify-between rounded p-2">
      <div className="w-full">{children}</div>
      {!readOnly && (
        <CloseIcon
          className="cursor-pointer text-xl text-error"
          onClick={onRemove}
        />
      )}
    </div>
  );
}

export function AddedUser({
  user,
  readOnly,
}: {
  user: RegisteredUser;
  readOnly?: boolean;
}) {
  const { removeUser } = usePlayersStore((state) => ({
    removeUser: state.removeUser,
  }));

  const onRemove = () => {
    removeUser(user.id);
  };

  return (
    <AddedPlayer onRemove={onRemove} readOnly={readOnly}>
      <Link href={`/profile/${user.id}`}>
        <div className="row center cursor-pointer justify-between">
          <span className="underline">{user.name}</span>
          <span className="meta opacity-50">@{user.username}</span>
        </div>
      </Link>
    </AddedPlayer>
  );
}

export function AddedGuest({
  guest,
  readOnly,
}: {
  guest: RegisteredGuest;
  readOnly?: boolean;
}) {
  const { removeGuest } = usePlayersStore((state) => ({
    removeGuest: state.removeGuest,
  }));

  const onRemove = () => {
    removeGuest(guest.name);
  };

  return (
    <AddedPlayer onRemove={onRemove} readOnly={readOnly}>
      <div className="row center w-full justify-between">
        <span>{guest.name}</span>
        <span className="meta opacity-50">guest</span>
      </div>
    </AddedPlayer>
  );
}
