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
      <h1>Register for {event?.name}</h1>
      <TeamRegistration event={event} />
    </div>
  );
}
