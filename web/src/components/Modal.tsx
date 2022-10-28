import { ReactNode } from "react";
import ClientOnlyPortal from "./ClientOnlyPortal";

export default function Modal({
  isOpen,
  children,
  className,
}: {
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}) {
  if (!isOpen) return null;
  return (
    <ClientOnlyPortal selector="#modal">
      <div className="bg-main fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center">
        <div className={className}>{children}</div>
      </div>
    </ClientOnlyPortal>
  );
}
