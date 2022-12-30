import TabDisplay, { TabPage } from "../TabDisplay";
import { EventDetails } from "@/types/event";
import RegisteredTeams from "./registration/RegisteredTeams";
import { displayDateTime } from "@/utils/formats";
import EventRegisterLink from "./registration/EventRegisterLink";

function Loader() {
  return (
    <div className="col loading-parent w-full overflow-x-hidden p-4">
      <header className="col center mb-4">
        <div className="loading-md w-44 text-center" />
      </header>
      <div className="h-96 w-full rounded-md bg-primary-light" />
    </div>
  );
}

function Cell({ event }: { event: EventDetails }) {
  const totalTeams = event.divisions
    .map((d) => d.teams.length)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="col w-full max-w-lg overflow-x-hidden">
      <header className="col center mb-4">
        <h1 className="text-center">{event.name}</h1>
        <div className="p-2"></div>
        <EventRegisterLink event={event} />
      </header>
      <TabDisplay titles={["Details", `Teams (${totalTeams})`]}>
        <TabPage className="col center p-4">
          <table className="table-v my-4 w-full">
            <tbody>
              <tr>
                <th>When:</th>
                <td>{displayDateTime(event.date)}</td>
              </tr>
              <tr>
                <th>Where:</th>
                <td>{event.location}</td>
              </tr>
            </tbody>
          </table>
          <p className="py-4">{event.description}</p>
        </TabPage>
        <TabPage>
          <RegisteredTeams event={event} />
        </TabPage>
      </TabDisplay>
    </div>
  );
}

export default function EventDisplay({ event }: { event?: EventDetails }) {
  if (event === undefined) return <Loader />;
  return <Cell event={event} />;
}
