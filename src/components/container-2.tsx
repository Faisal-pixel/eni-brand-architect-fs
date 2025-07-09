import { ReactNode } from "react";

export default function Container2({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-20">
      {children}
    </div>
  );
}
