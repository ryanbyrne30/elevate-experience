import type { IconProps } from "@/types/props";
import { BiConfused } from "react-icons/bi";
import Icon from "./Icon";

export default function BrandIcon(props: IconProps & { href?: string }) {
  return (
    <Icon {...props}>
      <BiConfused {...props} />
    </Icon>
  );
}
