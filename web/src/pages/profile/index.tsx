import Button from "@/components/buttons/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
        <Link href="/profile/edit">
          <Button type="button" className="primary">
            Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}
