import EventRegister from "@/components/events/EventRegister";
import { useParam } from "@/hooks/useParam";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";

export default function EventRegisterPage() {
  const id = useParam("id");
  const [eventId, setEventId] = useState(-1);
  const getQuery = trpc.useQuery(["events.get", { id: eventId }], {
    enabled: false,
  });

  useEffect(() => {
    if (id !== undefined) setEventId(parseInt(id));
  }, [id]);

  useEffect(() => {
    if (eventId !== -1) getQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <div className="buffer-y">
      <EventRegister event={getQuery.data} />
    </div>
  );
}
