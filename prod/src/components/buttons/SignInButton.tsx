import { signIn } from "next-auth/react";
import Button from "./Button";

export default function SignInButton() {
  return (
    <Button className="secondary" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
