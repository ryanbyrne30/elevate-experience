import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function ClientOnlyPortal({
  children,
  selector,
}: {
  children: ReactNode;
  selector: string;
}) {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted && ref.current !== null
    ? createPortal(children, ref.current)
    : null;
}
