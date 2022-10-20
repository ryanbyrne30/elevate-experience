import type { ElementProps } from "@/types/props";

export default function PrimaryButton(props: ElementProps) {
  return <button class="primary">{props.children}</button>;
}
