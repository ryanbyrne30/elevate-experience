import { useParam } from "@/hooks/useParam";
import { useRedirect } from "@/hooks/useRedirect";
import { useEffect, useState } from "react";

export default function AuthErrorPage() {
  const [mounted, setMounted] = useState(false);
  const error = useParam("error");

  useRedirect(error === "AccessDenied", "/auth/signIn");

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) return null;

  return (
    <div className="buffer-y text-center">
      <h1>Whoops!</h1>
      <h3>An error has occured.</h3>
      <div className="group">{error}</div>
    </div>
  );
}
