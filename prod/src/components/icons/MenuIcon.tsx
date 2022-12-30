import type { IconProps } from "@/types/props";
import { BiMenu } from "react-icons/bi";
import Icon from "./Icon";

export default function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <BiMenu {...props} />
    </Icon>
  );
}
