import type { ComponentChildren } from "preact";
import type { IconBaseProps } from "react-icons";

export type IconProps = IconBaseProps & {
  class?: string;
};

export type ElementProps = {
  class?: string;
  children?: ComponentChildren;
};
