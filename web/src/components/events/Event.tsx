import TabDisplay, { TabPage } from "../TabDisplay";
import EventRegisterLink from "./registration/EventRegisterLink";
import { EventDetails } from "@/types/event";
import RegisteredTeams from "./registration/RegisteredTeams";

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
  return (
    <div className="col w-full overflow-x-hidden p-4">
      <header className="col mb-4">
        <h1 className="text-center">{event.name}</h1>
      </header>
      <TabDisplay titles={["Details", `Teams (${event.teams.length})`]}>
        <TabPage className="col center p-4">
          <table className="table-v my-4 w-full">
            <tbody>
              <tr>
                <th>Date:</th>
                <td>{event.date.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Location:</th>
                <td>{event.location}</td>
              </tr>
            </tbody>
          </table>
          <p className="py-8">{event.description}</p>
          <div className="row center w-full justify-center pt-8">
            <EventRegisterLink event={event} />
          </div>
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
