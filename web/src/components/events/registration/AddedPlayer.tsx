import { ReactNode } from "react";
import {
  RegisteredGuest,
  RegisteredUser,
  usePlayersStore,
} from "./playerStore";
import CloseIcon from "@/components/icons/CloseIcon";

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
    <div className="row center my-1 w-full justify-between rounded bg-primary-light p-2">
      <div>{children}</div>
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
      <div className="col">
        <span>{user.name}</span>
        <span className="meta opacity-50">@{user.username}</span>
      </div>
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
      <div className="col">
        <span>{guest.name}</span>
        <span className="meta opacity-50">guest</span>
      </div>
    </AddedPlayer>
  );
}
