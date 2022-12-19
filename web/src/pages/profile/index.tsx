import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession({ required: true });
  return (
    <div className="buffer-y">
      <h1>{session?.user?.name}&apos;s Profile</h1>
    </div>
  );
}
