import BrandIcon from "./icons/BrandIcon";
import MenuIcon from "./icons/MenuIcon";
import { useState } from "preact/hooks";
import type { ElementProps } from "@/types/props";

function PrimaryMenu() {
  return (
    <ul class="col center justify-center md:flex-row">
      <li class="p-2">
        <a href="/">Home</a>
      </li>
      <li class="p-2">
        <a href="/">Events</a>
      </li>
      <li class="p-2">
        <a href="/">About</a>
      </li>
      <li class="p-2">
        <a href="/">Contact</a>
      </li>
    </ul>
  );
}

function SecondaryMenu(props: ElementProps) {
  return (
    <ul class={`${props.class}`}>
      <li class="p-2">
        <a href="/">Sign In</a>
      </li>
      <li class="p-2">
        <a href="/">Sign Up</a>
      </li>
    </ul>
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav class="fixed top-0 left-0 w-screen bg-primary z-50">
      <div class="w-screen p-2 row center justify-between">
        <a href="/">
          <BrandIcon class="text-3xl" />
        </a>
        <div onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon class="text-3xl cursor-pointer md:hidden" />
          <SecondaryMenu class="hidden md:flex-row md:flex" />
        </div>
        <div
          class={`absolute top-0 left-0 w-full transition-all 
        overflow-hidden bg-primary col center justify-center -z-10 ${
          isOpen ? "h-screen" : "h-0"
        } md:h-fit md:w-fit md:left-1/2 md:-translate-x-1/2 
        md:top-1/2 md:-translate-y-1/2 md:z-10`}
        >
          <PrimaryMenu />
          <SecondaryMenu class="flex flex-col center p-4 md:hidden" />
        </div>
      </div>
    </nav>
  );
}
