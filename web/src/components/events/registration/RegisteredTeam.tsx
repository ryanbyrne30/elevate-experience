import { TeamDetails } from "@/types/event";
import { User } from "@prisma/client";
import { HTMLAttributes } from "react";

function RegisteredPlayer(props: HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={`${className} row center w-full rounded bg-primary-light p-2`}
      {...rest}
    >
      {children}
    </div>
  );
}

function RegisteredGuest({ guestName }: { guestName: string }) {
  return <RegisteredPlayer>{guestName}</RegisteredPlayer>;
}

function RegisteredUser({ user }: { user: User }) {
  return <RegisteredPlayer>{user.name}</RegisteredPlayer>;
}

function Loader() {
  return <ul className="w-full">Loading...</ul>;
}

function Cell({ team }: { team: TeamDetails }) {
  return (
    <ul className="col w-full">
      {team.teamPlayers.map((player) => (
        <li key={player.userId} className="my-0.5">
          <RegisteredUser user={player.user} />
        </li>
      ))}
      {team.guests?.split(",").map((guest) => (
        <li key={guest} className="my-0.5">
          <RegisteredGuest guestName={guest} />
        </li>
      ))}
    </ul>
  );
}

export default function RegisteredTeam({ team }: { team?: TeamDetails }) {
  if (team === undefined) return <Loader />;
  return <Cell team={team} />;
}
