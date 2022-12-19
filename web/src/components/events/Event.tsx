import EventRegisterLink from "./registration/EventRegisterLink";
import { EventDetails } from "@/types/event";

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
    <div className="w-full p-4">
      <h1>{event.name}</h1>
      <div className="meta row center w-full justify-between py-8">
        <span>{event.location}</span>
        <span>{event.date.toLocaleString()}</span>
      </div>
      <p>{event.description}</p>
      <div className="row center w-full justify-center pt-8">
        <EventRegisterLink event={event} />
      </div>
    </div>
  );
}

export default function EventDisplay({ event }: { event?: EventDetails }) {
  if (event === undefined) return <Loader />;
  return <Cell event={event} />;
}
