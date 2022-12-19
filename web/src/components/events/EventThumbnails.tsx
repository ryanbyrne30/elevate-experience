import EventThumbnail from "./EventThumbnail";
import { EventDetails } from "@/types/event";

function Loader() {
  return (
    <ul>
      <li className="my-4">
        <EventThumbnail />
      </li>
      <li className="my-4">
        <EventThumbnail />
      </li>
      <li className="my-4">
        <EventThumbnail />
      </li>
    </ul>
  );
}

function Cell({ events }: { events: EventDetails[] }) {
  return (
    <ul>
      {events.map((e) => (
        <li key={e.id} className="my-4">
          <EventThumbnail event={e} />
        </li>
      ))}
    </ul>
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
