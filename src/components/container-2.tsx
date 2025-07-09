import { ReactNode } from "react";

export default function Container2({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-10 md:px-[60px] lg:px-20">
      {children}
    </div>
  );
}
