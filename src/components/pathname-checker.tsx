// PathnameChecker.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BuyTicketsComponent from "./home_page/components/buy-tickets.components";

const PathnameChecker = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" && (
        <BuyTicketsComponent />
      )}
    </>
  );
};

export default PathnameChecker;
