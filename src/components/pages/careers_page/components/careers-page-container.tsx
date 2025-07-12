import React from "react";
type Props = {
  children: React.ReactNode;
};

const CareersPageContainer = ({ children }: Props) => {
  return (
    <div className="w-full px-10 md:px-[60px] lg:px-[100px]">{children}</div>
  );
};

export default CareersPageContainer;
