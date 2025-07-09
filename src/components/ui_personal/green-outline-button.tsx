import React from "react";
import { Button } from "../ui/button";

type Props = {
  title: string;
  className?: string;
  onClickFunction?: () => void;
};

const GreenOutlineButton = ({ title, onClickFunction, className }: Props) => {
  return (
    <Button
      variant={"green-outline"}
      className={`${className}`}
      onClick={onClickFunction}
    >
      {title}
    </Button>
  );
};

export default GreenOutlineButton;
