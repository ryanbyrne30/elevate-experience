import { ButtonProps } from "@/types/props";
import Link from "next/link";

export default function Button(
  props: ButtonProps & {
    href?: string;
    isLoading?: boolean;
    loadingMessage?: string;
  }
) {
  const { href, isLoading, loadingMessage, className, onClick, ...rest } =
    props;
  const button = (
    <button
      {...rest}
      onClick={(e) => {
        if (isLoading) e.preventDefault();
        else if (onClick) onClick(e);
      }}
      className={`${className} ${isLoading ? "animate-pulse" : ""}`}
    >
      {isLoading ? loadingMessage : props.children}
    </button>
  );

  if (href) return <Link href={href}>{button}</Link>;
  return button;
}
