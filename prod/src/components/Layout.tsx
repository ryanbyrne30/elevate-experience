import { ReactNode } from "react";
import Nav from "./Nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="col center min-h-screen w-screen">{children}</main>
    </>
  );
}
