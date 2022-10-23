import { ButtonProps } from "@/types/props";
import Button from "./Button";

export default function SecondaryButton(
  props: ButtonProps & { href?: string }
) {
  return <Button className="secondary">{props.children}</Button>;
}
