import RegisteredTeams from "@/components/events/registration/RegisteredTeams";
import { useParam } from "@/hooks/useParam";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

export default function EventRegisteredPage() {
  const id = useParam("id");
  const getQuery = trpc.useQuery(
    ["events.get", { id: id !== undefined ? parseInt(id) : -1 }],
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (id !== undefined) getQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="buffer-y col center w-screen max-w-sm px-4">
      <span className="meta">{getQuery.data?.name}</span>
      <h1>Teams Registered</h1>
      <RegisteredTeams event={getQuery.data} />
    </div>
  );
}
