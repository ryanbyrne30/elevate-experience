import Button from "@/components/buttons/Button";
import { EventDetails } from "@/types/event";
import { Division } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EventRegisterLink({ event }: { event: EventDetails }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const { data: session } = useSession();
  const [validDivisions, setValidDivisions] = useState<Division[]>([]);

  useEffect(() => {
    const uids: string[] = [];
    event.divisions.forEach((d) =>
      d.teams.forEach((t) => t.teamUsers.forEach((u) => uids.push(u.userId)))
    );
    setIsRegistered(
      session?.user?.id !== undefined && uids.includes(session?.user?.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  useEffect(() => {
    setValidDivisions(event.divisions.filter((d) => d.teamEntryFee !== null));
  }, [event.divisions]);

  if (isRegistered)
    return (
      <span className="text-sm italic text-green-400 opacity-50">
        Already registered
      </span>
    );

  if (validDivisions.length <= 0)
    return (
      <span className="meta italic opacity-50">Registration unavailable</span>
    );
  return (
    <Button
      type="button"
      className="primary w-fit"
      href={`/events/${event.id}/register`}
    >
      Register
    </Button>
  );
}
