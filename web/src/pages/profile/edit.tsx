import PageHead from "@/components/PageHead";
import EditProfile from "@/components/profile/EditProfile";

export default function ProfileEditPage() {
  return (
    <>
      <PageHead
        title="Edit Profile"
        description="Edit your Elevate Experience profile."
      />
      <div className="buffer-y">
        <EditProfile />
      </div>
    </>
  );
}
