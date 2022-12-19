import BrandIcon from "./icons/BrandIcon";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useState } from "react";
import { ElementProps } from "../types/props";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "./buttons/Button";

function PrimaryMenu() {
  return (
    <ul className="col center justify-center md:flex-row">
      <li className="m-2">
        <Link href="/">Home</Link>
      </li>
      <li className="m-2">
        <Link href="/events">Events</Link>
      </li>
      <li className="m-2">
        <Link href="/">About</Link>
      </li>
      <li className="m-2">
        <Link href="/">Contact</Link>
      </li>
    </ul>
  );
}

function SecondaryMenu(props: ElementProps) {
  const { status } = useSession();

  if (status === "authenticated")
    return (
      <ul className={props.className}>
        <li className="m-2">
          <Button className="secondary" onClick={() => signOut()}>
            Sign Out
          </Button>
        </li>
      </ul>
    );

  return (
    <ul className={props.className}>
      <li className="m-2">
        <Button className="secondary" onClick={() => signIn()}>
          Sign In
        </Button>
      </li>
      <li className="m-2">
        <Button className="primary">Sign Up</Button>
      </li>
    </ul>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll("#nav li");

    links.forEach((link) =>
      link.addEventListener("click", () => setIsOpen(false))
    );
  }, []);

  return (
    <nav id="nav" className="fixed top-0 left-0 z-50 w-screen bg-primary">
      <div className="row center w-screen justify-between p-2 md:p-1 md:px-4">
        <BrandIcon href="/" className="text-3xl" />
        <div onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="cursor-pointer text-3xl md:hidden" />
          <SecondaryMenu className="hidden md:flex md:flex-row" />
        </div>
        <div
          className={`col center absolute top-0 left-0 
        -z-10 w-full justify-center overflow-hidden bg-primary transition-all ${
          isOpen ? "h-screen" : "h-0"
        } md:left-1/2 md:top-1/2 md:z-10 md:h-fit 
        md:w-fit md:-translate-x-1/2 md:-translate-y-1/2`}
        >
          <PrimaryMenu />
          <SecondaryMenu className="center flex flex-col p-4 md:hidden" />
        </div>
      </div>
    </nav>
  );
}
