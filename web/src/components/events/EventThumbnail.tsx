import { EventDetails } from "@/types/event";
import EventDisplay from "./Event";

function Loader() {
  return (
    <div className="h-full w-full max-w-lg">
      <EventDisplay />
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
