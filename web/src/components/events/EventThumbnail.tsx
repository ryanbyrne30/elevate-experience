import { displayDate } from "@/utils/formats";
import { Event } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import Button from "../buttons/Button";
import MoreIcon from "../icons/MoreIcon";
import EventThumbnailActions from "./EventThumbnailActions";

export default function EventThumbnail({ event }: { event: Event }) {
  const [actionState, setActionState] = useState(false);

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
        {/* <MoreIcon
          className="cursor-pointer text-2xl"
          onClick={() => setActionState(true)}
        />
        <div
          className={`row center absolute right-0 top-0 h-full justify-center overflow-hidden bg-primary-light transition-all ${
            actionState ? "w-full" : "w-0"
          }`}
        >
          <div
            className={`h-full w-full transition-opacity ${
              actionState ? "opacity-100" : "opacity-0"
            }`}
          >
            <EventThumbnailActions
              onClose={() => setActionState(false)}
              event={event}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
