import { EventDetails } from "@/types/event";
import EventDisplay from "./Event";

function Loader() {
  return (
    <div className="rounded-2xl bg-primary-light">
      <div className="col loading-parent h-80 w-80 justify-between p-4 shadow-md">
        <div className="col h-full justify-between py-4">
          <div className="loading-lg w-60 bg-primary" />
          <div className="col w-full">
            <div className="loading-md my-2 w-full bg-primary" />
            <div className="loading-md my-2 w-full bg-primary" />
          </div>
          <div className="row center w-full justify-between">
            <div className="loading-md w-20 bg-primary" />
            <div className="loading-md w-20 bg-primary" />
          </div>
        </div>
        <div className="">
          <div className="loading-lg w-24 bg-primary" />
        </div>
      </div>
    </div>
  );
}

function Cell({ event }: { event: EventDetails }) {
  return (
    <div className="h-full w-full max-w-lg">
      <EventDisplay event={event} />
    </div>
  );
}

export default function EventThumbnail({ event }: { event?: EventDetails }) {
  if (event === undefined) return <Loader />;
  return <Cell event={event} />;
}
