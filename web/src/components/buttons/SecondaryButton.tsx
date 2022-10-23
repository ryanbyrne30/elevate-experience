import { ButtonProps } from "@/types/props";
import Button from "./Button";

export default function SecondaryButton(
  props: ButtonProps & {
    href?: string;
    isLoading?: boolean;
    loadingMessage?: string;
  }
) {
  const { className, ...rest } = props;
  return (
    <Button className={`${className} secondary`} {...rest}>
      {props.children}
    </Button>
  );
}
