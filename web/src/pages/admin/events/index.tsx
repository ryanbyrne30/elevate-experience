import DataTable from "@/components/DataTable";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export default function AdminEventsPage() {
  const eventsQuery = trpc.useQuery(["events.getAll"]);

  return (
    <>
      <Head>
        <title>Admin Events</title>
      </Head>
      <div>
        <h1>Admin events</h1>
        {eventsQuery.data && eventsQuery.data.length > 0 && (
          <DataTable data={eventsQuery.data} />
        )}
      </div>
    </>
  );
}
