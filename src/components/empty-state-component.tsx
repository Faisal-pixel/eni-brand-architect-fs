import { EmptyStateBG, EmptyStateBookIcon } from "@/assets/icons";
import Image from "next/image";
import React from "react";
import GreenButton from "./ui_personal/green-button";

type Props = {
    emptyStateTitle?: string;
    emptyStateDescription?: string;
    emptyStateButtonText?: string;
    handleButtonClicked?: () => void;
};

const EmptyStateComponent = ({emptyStateTitle, emptyStateDescription, emptyStateButtonText, handleButtonClicked}: Props) => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div>
        <Image
          src={EmptyStateBG}
          alt="Empty State Background"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto max-w-[90%] max-h-[90%]"
        />
        <Image
          src={EmptyStateBookIcon}
          alt="Empty State Icon"
          className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="relative z-10 max-w-[1176px] pt-16 flex flex-col gap-y-6">
        <div className="max-w-[352px] text-center">
          <h3 className="font-semibold text-base text-center">
            {emptyStateTitle || "No blog posts available"}
          </h3>
          <p className="text-[rgba(83,88,98,1)] text-sm leading-[20px]">
            {emptyStateDescription ||
              "We’re working on fresh content and insights that will be live soon. Explore our services in the meantime."}
          </p>
        </div>

        <GreenButton
          title={emptyStateButtonText || "Explore Services"}
          className="self-center py-2.5 px-3.5 cursor-pointer rounded-[8px]"
          onClickFunction={handleButtonClicked}
        />
      </div>
    </div>
  );
};

export default EmptyStateComponent;
