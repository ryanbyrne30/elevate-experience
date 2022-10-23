import { ButtonProps } from "../../types/props";
import Button from "./Button";

export default function PrimaryButton(
  props: ButtonProps & {
    href?: string;
    isLoading?: boolean;
    loadingMessage?: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <Button className={`${className} primary`} {...rest}>
      {props.children}
    </Button>
  );
}
