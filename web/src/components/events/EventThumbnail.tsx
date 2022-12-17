import { displayDate } from "@/utils/formats";
import { Event } from "@prisma/client";
import Link from "next/link";
import Button from "../buttons/Button";

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

function Cell({ event }: { event: Event }) {
  return (
    <div className="col h-80 w-80 rounded-2xl bg-primary-light p-4 shadow-md">
      <Link href={`/events/${event.id}`}>
        <div className="col h-full cursor-pointer justify-between py-4">
          <span className="font-condensed text-2xl font-bold">
            {event.name}
          </span>
          <p className="max-w-full overflow-hidden text-ellipsis line-clamp-2">
            {event.description}
          </p>
          <div className="row center meta w-full justify-between">
            <span>{event.location}</span>
            <span>{displayDate(event.date)}</span>
          </div>
        </div>
      </Link>
      <div className="row center relative mt-4 w-full justify-between py-2">
        <Button className="primary" href={`/events/${event.id}/register`}>
          Register
        </Button>
      </div>
    </div>
  );
}

export default function EventThumbnail({ event }: { event?: Event }) {
  if (event === undefined) return <Loader />;
  return <Cell event={event} />;
}
