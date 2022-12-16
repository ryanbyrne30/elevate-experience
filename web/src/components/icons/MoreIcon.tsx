import { IconProps } from "@/types/props";
import Icon from "./Icon";
import { FiMoreHorizontal } from "react-icons/fi";

export default function MoreIcon(props: IconProps) {
  return (
    <Icon>
      <FiMoreHorizontal {...props} />
    </Icon>
  );
}
