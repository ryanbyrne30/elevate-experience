import Icon from "./Icon";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconProps } from "@/types/props";

export default function CloseIcon(props: IconProps) {
  return (
    <Icon>
      <AiFillCloseCircle {...props} />
    </Icon>
  );
}
