import { Event } from "@prisma/client";
import EventThumbnail from "./EventThumbnail";

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

function Cell({ events }: { events: Event[] }) {
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

export default function EventThumbnails({ events }: { events?: Event[] }) {
  if (events === undefined) return <Loader />;
  return <Cell events={events} />;
}
