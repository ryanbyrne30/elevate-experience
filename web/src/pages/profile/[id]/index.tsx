import Profile from "@/components/profile/profile";
import { useParam } from "@/hooks/useParam";
import { trpc } from "@/utils/trpc";
import { useEffect } from "react";

export default function ProfilePage() {
  const id = useParam("id");

  const getQuery = trpc.useQuery(["user.get", { id: id || "" }], {
    enabled: false,
  });

  useEffect(() => {
    if (id !== undefined) getQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return <Profile profile={getQuery.data} />;
}
