import { ElementProps } from "../../types/props";

export default function PrimaryButton(props: ElementProps) {
  return <button className="primary">{props.children}</button>;
}
