import { DivisionDetails, EventDetails, TeamDetails } from "@/types/event";
import RegisteredTeam from "./RegisteredTeam";
import { useState } from "react";

function RegisteredTeams({ teams }: { teams: TeamDetails[] }) {
  return (
    <ul className="col w-full">
      {teams.map((team) => (
        <li key={team.id} className="my-4">
          <RegisteredTeam team={team} />
        </li>
      ))}
    </ul>
  );
}

function EventDivision({ division }: { division: DivisionDetails }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen max-w-lg rounded-md p-4 shadow-md">
      <div
        className="row center w-full justify-between bg-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="row center w-full justify-between">
          <span className="font-condensed text-xl font-bold">
            {division.name}
          </span>
          <span className="meta">
            {division.teams.length}/{division.maxTeams}
          </span>
        </div>
      </div>
      <div className={`max-h-96 overflow-scroll pb-8`}>
        <RegisteredTeams teams={division.teams} />
      </div>
    </div>
  );
}

export default function EventDivisions({ event }: { event?: EventDetails }) {
  return (
    <div className="max-h-96 overflow-hidden">
      <ul className="row snap-x snap-mandatory items-start overflow-x-scroll">
        {event?.divisions.map((d) => (
          <li key={d.id} className="snap-center">
            <EventDivision division={d} />
          </li>
        ))}
      </ul>
    </div>
  );
}
