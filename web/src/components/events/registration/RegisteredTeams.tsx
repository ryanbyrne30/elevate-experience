import { EventDetails } from "@/types/event";
import RegisteredTeam from "./RegisteredTeam";

export default function RegisteredTeams({ event }: { event?: EventDetails }) {
  return (
    <ul className="col w-full">
      {event?.teams.map((team) => (
        <li key={team.id} className="my-4">
          <RegisteredTeam team={team} />
        </li>
      ))}
    </ul>
  );
}
