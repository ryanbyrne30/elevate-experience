import { TeamDetails } from "@/types/event";
import { AddedGuest, AddedUser } from "./AddedPlayer";

function Loader() {
  return <ul className="w-full">Loading...</ul>;
}

function Cell({ team }: { team: TeamDetails }) {
  return (
    <ul className="col w-full">
      {team.teamPlayers.map((player) => (
        <li key={player.userId} className="my-0.5">
          <AddedUser user={player.user} readOnly={true} />
        </li>
      ))}
      {team.guests?.split(",").map((guest) => (
        <li key={guest} className="my-0.5">
          <AddedGuest guest={{ name: guest }} readOnly={true} />
        </li>
      ))}
    </ul>
  );
}

export default function RegisteredTeam({ team }: { team?: TeamDetails }) {
  if (team === undefined) return <Loader />;
  return <Cell team={team} />;
}
