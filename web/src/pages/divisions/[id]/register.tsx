import DivisionRegister from "@/components/divisions/DivisionRegister";
import { useParam } from "@/hooks/useParam";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

export default function DivisionRegisterPage() {
  const id = useParam("id");
  const getQuery = trpc.useQuery(["divisions.get", { id: id || "" }], {
    enabled: false,
  });

  useEffect(() => {
    if (id !== undefined) getQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="buffer-y col center w-full max-w-lg">
      <DivisionRegister division={getQuery.data} />
    </div>
  );
}
