import { ProfilePublic } from "@/types/profile";
import { useSession } from "next-auth/react";
import Button from "../buttons/Button";

function Loader() {
  return <div className="loading-parent">Loading...</div>;
}

function Cell({ profile }: { profile: ProfilePublic }) {
  const { data: session } = useSession();
  const currentUser = session?.user;

  return (
    <div className="buffer-y px-4">
      <header className="col center text-center">
        <h1>{profile.name}</h1>
        <span className="my-2 font-bold opacity-50">@{profile.username}</span>
        {currentUser?.id === profile.id && (
          <Button href="/profile/edit" className="secondary">
            Edit
          </Button>
        )}
      </header>
    </div>
  );
}

export default function Profile({
  profile,
}: {
  profile?: ProfilePublic | null;
}) {
  if (!profile) return <Loader />;
  return <Cell profile={profile} />;
}
