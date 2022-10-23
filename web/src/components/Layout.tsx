import { ReactNode } from "react";
import Nav from "./Nav";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="col center w-screen pt-16">{children}</main>
    </>
  );
}
