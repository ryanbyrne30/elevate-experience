import BrandIcon from "./icons/BrandIcon";
import MenuIcon from "./icons/MenuIcon";
import { useEffect, useState } from "preact/hooks";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav class="fixed top-0 left-0 w-screen bg-primary z-50">
      <div class="w-screen p-2 row center justify-between">
        <a href="/">
          <BrandIcon class="text-3xl" />
        </a>
        <span onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon class="text-3xl cursor-pointer" />
        </span>
      </div>
      <ul
        class={`absolute top-full left-0 w-full transition-all overflow-hidden bg-inherit col center justify-center ${
          isOpen ? "h-screen" : "h-0"
        }`}
      >
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
    </nav>
  );
}
