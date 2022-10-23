import { ButtonProps } from "@/types/props";
import Link from "next/link";

export default function Button(props: ButtonProps & { href?: string }) {
  const button = <button {...props}>{props.children}</button>;

  if (props.href) return <Link href={props.href}>{button}</Link>;
  return button;
}
