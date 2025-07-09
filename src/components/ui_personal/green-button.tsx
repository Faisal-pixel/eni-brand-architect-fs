import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  className?: string;
  onClickFunction?: () => void;
};

const GreenButton = ({ title, onClickFunction, className }: Props) => {
  return (
    <Button
      variant={"green"}
      className={`${className}`}
      onClick={onClickFunction}
    >
      {title}
    </Button>
  );
};

export default GreenButton;
