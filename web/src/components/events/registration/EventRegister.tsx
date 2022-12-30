import { Division, Event, Team } from "@prisma/client";
import Link from "next/link";

function Loader() {
  return <div>Loading...</div>;
}

function Cell({
  event,
}: {
  event: Event & { divisions: (Division & { teams: Team[] })[] };
}) {
  const divisions = event.divisions.filter((d) => d.teamEntryFee !== null);

  return (
    <div className="col center w-full max-w-lg">
      <span className="meta">{event.name}</span>
      <h1>Register</h1>
      <div className="group">
        <label>Select a division</label>
        <ul className="w-full">
          {divisions.map((d) => (
            <li key={d.id} className="my-2 w-full">
              <Link href={`/divisions/${d.id}/register`}>
                <div className="row center w-full cursor-pointer justify-between rounded-md bg-primary-light p-4 shadow-md">
                  <div className="col">
                    <span className="text-lg font-bold">{d.name}</span>
                    <span className="meta">
                      {d.teams.length}/{d.maxTeams}
                    </span>
                  </div>
                  <span className="text-xl">${d.teamEntryFee}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function EventRegister({
  event,
}: {
  event?: Event & { divisions: (Division & { teams: Team[] })[] };
}) {
  if (event === undefined) return <Loader />;
  return <Cell event={event} />;
}
