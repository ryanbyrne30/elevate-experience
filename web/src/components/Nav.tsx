import BrandIcon from "./icons/BrandIcon";
import MenuIcon from "./icons/MenuIcon";
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import { useState } from "react";
import { ElementProps } from "../types/props";
import Link from "next/link";

function PrimaryMenu() {
  return (
    <ul className="col center justify-center md:flex-row">
      <li className="p-2">
        <Link href="/">Home</Link>
      </li>
      <li className="p-2">
        <Link href="/events">Events</Link>
      </li>
      <li className="p-2">
        <Link href="/">About</Link>
      </li>
      <li className="p-2">
        <Link href="/">Contact</Link>
      </li>
    </ul>
  );
}

function SecondaryMenu(props: ElementProps) {
  return (
    <ul className={`${props.className}`}>
      <li className="p-2">
        <Link href="/">
          <SecondaryButton>Sign In</SecondaryButton>
        </Link>
      </li>
      <li className="p-2">
        <Link href="/">
          <PrimaryButton>Sign Up</PrimaryButton>
        </Link>
      </li>
    </ul>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary fixed top-0 left-0 z-50 w-screen">
      <div className="row center w-screen justify-between p-2 md:p-1 md:px-4">
        <Link href="/">
          <BrandIcon className="text-3xl" />
        </Link>
        <div onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="cursor-pointer text-3xl md:hidden" />
          <SecondaryMenu className="hidden md:flex md:flex-row" />
        </div>
        <div
          className={`col center bg-primary absolute top-0 
        left-0 -z-10 w-full justify-center overflow-hidden transition-all ${
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
