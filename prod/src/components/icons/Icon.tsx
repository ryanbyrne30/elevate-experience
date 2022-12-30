import type { IconProps } from "@/types/props";
import Link from "next/link";

export default function Icon(props: IconProps & { href?: string }) {
  if (props.href)
    return (
      <Link href={props.href}>
        <div>{props.children}</div>
      </Link>
    );
  return <>{props.children}</>;
}
