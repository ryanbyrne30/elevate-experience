import PageHead from "@/components/PageHead";
import EventRegister from "@/components/events/registration/EventRegister";
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
    <>
      <PageHead
        title={`Register for ${getQuery.data?.name}`}
        description={`Register for ${getQuery.data?.name}. This event is brought to you by Elevate Experience.`}
      />
      <div className="buffer-y col center w-full px-4">
        <EventRegister event={getQuery.data} />
      </div>
    </>
  );
}
