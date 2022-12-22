import EventThumbnails from "@/components/events/EventThumbnails";
import { trpc } from "@/utils/trpc";

export default function EventsPage() {
  const getQuery = trpc.useQuery(["events.getAll"]);

  return (
    <div>
      <EventThumbnails events={getQuery.data} />
    </div>
  );
}
