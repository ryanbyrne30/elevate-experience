import PageHead from "@/components/PageHead";
import EventThumbnails from "@/components/events/EventThumbnails";
import { trpc } from "@/utils/trpc";

export default function EventsPage() {
  const getQuery = trpc.useQuery(["events.getAll"]);

  return (
    <>
      <PageHead title="Events" description="Elevate Experience's events." />
      <div>
        <EventThumbnails events={getQuery.data} />
      </div>
    </>
  );
}
