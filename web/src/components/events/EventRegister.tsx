import { Event } from "@prisma/client";

export default function EventRegister({ event }: { event?: Event }) {
  return <div>Register for {event?.name}</div>;
}
