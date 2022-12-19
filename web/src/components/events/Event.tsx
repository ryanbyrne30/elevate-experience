import TabDisplay, { TabPage } from "../TabDisplay";
import EventRegisterLink from "./registration/EventRegisterLink";
import { EventDetails } from "@/types/event";
import RegisteredTeams from "./registration/RegisteredTeams";

function Loader() {
  return (
    <div className="loading-parent w-full p-4">
      <h1 className="loading-lg w-60"></h1>
      <div className="row center w-full justify-between py-8">
        <div className="loading-md w-20" />
        <div className="loading-md w-20" />
      </div>
      <div className="loading-md my-2 w-full" />
      <div className="loading-md my-2 w-full" />
      <div className="loading-md my-2 w-full" />
      <div className="row center w-full justify-center pt-8">
        <div className="loading-lg my-2 w-20" />
      </div>
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
        <TabPage className="col center">
          <table className="table-v my-4">
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
