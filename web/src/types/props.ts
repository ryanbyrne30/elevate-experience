import { ReactNode } from "react";
import type { IconBaseProps } from "react-icons";

export type IconProps = IconBaseProps & {
  class?: string;
};

export type ElementProps = {
  className?: string;
  children?: ReactNode;
};
