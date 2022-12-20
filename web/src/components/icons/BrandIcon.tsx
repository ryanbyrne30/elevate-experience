import Image from "next/image";
import { HTMLAttributes } from "react";

export default function BrandIcon(
  props: HTMLAttributes<HTMLDivElement> & { href?: string }
) {
  const { className, href, ...rest } = props;

  return (
    <div className={`${className || ""} relative`} {...rest}>
      <a href={href}>
        <Image src="/logo-white.webp" layout="fill" alt="Logo" />
      </a>
    </div>
  );
}
