import { Event } from "@prisma/client";
import { useSession } from "next-auth/react";
import TeamRegistration from "./TeamRegistration";

export default function EventRegister({ event }: { event?: Event }) {
  const { data: session, status } = useSession({
    required: true,
  });

  console.log(session);

  return (
    <div className="form">
      <div className="center group">
        <span className="font-condensed text-lg">Register for</span>
        <h1>{event?.name}</h1>
      </div>
      <TeamRegistration event={event} />
    </div>
  );
}
