import { ButtonProps } from "../../types/props";
import Button from "./Button";

export default function PrimaryButton(props: ButtonProps & { href?: string }) {
  return <Button className="primary">{props.children}</Button>;
}
