import EventThumbnail from "./EventThumbnail";
import { EventDetails } from "@/types/event";

function Loader() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <ul className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll">
        <li className="col center h-screen w-screen snap-center justify-start pt-12 sm:pt-16">
          <EventThumbnail />
        </li>
      </ul>
      <EventThumbnail />
    </div>
  );
}

function Cell({ events }: { events: EventDetails[] }) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <ul className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll">
        {events.map((e) => (
          <li
            key={e.id}
            className="col center h-screen w-screen snap-center justify-start pt-12 sm:pt-16"
          >
            <EventThumbnail event={e} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EventThumbnails({
  events,
}: {
  events?: EventDetails[];
}) {
  if (events === undefined) return <Loader />;
  return <Cell events={events} />;
}
