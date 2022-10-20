import type { ElementProps } from "@/types/props";

export default function SecondaryButton(props: ElementProps) {
  return <button class="secondary">{props.children}</button>;
}
