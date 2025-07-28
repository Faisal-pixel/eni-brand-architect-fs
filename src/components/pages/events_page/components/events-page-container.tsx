import { ReactNode } from "react";

export default function EventsPageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full px-10 md:px-[60px] lg:px-[100px]">
      {children}
    </div>
  );
}
