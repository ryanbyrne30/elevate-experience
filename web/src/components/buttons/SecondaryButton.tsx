import type { ElementProps } from "@/types/props";

export default function SecondaryButton(props: ElementProps) {
  return <button className="secondary">{props.children}</button>;
}
