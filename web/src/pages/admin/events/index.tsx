import DataTable from "@/components/DataTable";
import { trpc } from "@/utils/trpc";
import Head from "next/head";

export default function AdminEventsPage() {
  const eventsQuery = trpc.useQuery(["events.getAll"]);
  const updateMutation = trpc.useMutation("events.update");

  const onUpdate = (
    id: number | string,
    key: string,
    value: string | number
  ) => {
    const updates = Object.fromEntries([
      ["id", id],
      [key, value],
    ]);
    updateMutation.mutate(updates);
  };

  return (
    <>
      <Head>
        <title>Admin Events</title>
      </Head>
      <div>
        <h1>Admin events</h1>
        {eventsQuery.data && eventsQuery.data.length > 0 && (
          <DataTable data={eventsQuery.data} onUpdate={onUpdate} />
        )}
      </div>
    </>
  );
}
