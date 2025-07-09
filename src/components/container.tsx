import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-5">
      {children}
    </div>
  );
}
