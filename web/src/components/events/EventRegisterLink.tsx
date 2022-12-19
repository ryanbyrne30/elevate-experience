import { EventDetails } from "@/types/event";
import Button from "../buttons/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function EventRegisterLink({ event }: { event: EventDetails }) {
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (session?.user?.id) {
      const uids: string[] = [];
      event.teams.forEach((team) =>
        team.teamPlayers.forEach((player) => uids.push(player.userId))
      );
      setIsRegistered(uids.includes(session.user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  if (isRegistered)
    return (
      <span className="text-center text-sm font-thin italic opacity-50">
        Already registered
      </span>
    );

  return (
    <Button className="primary" href={`/events/${event.id}/register`}>
      Register
    </Button>
  );
}
