import Button from "@/components/buttons/Button";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession({ required: true });
  return (
    <div className="buffer-y px-4">
      <header className="text-center">
        <h1>{session?.user?.name}</h1>
        <span className="meta">@{session?.user?.username}</span>
      </header>
      <div className="group">
        <table>
          <tbody>
            <tr>
              <th>email</th>
              <td>{session?.user?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="group">
        <Button type="button" className="primary" href="/profile/edit">
          Edit
        </Button>
      </div>
    </div>
  );
}
