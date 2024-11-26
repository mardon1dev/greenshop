import React, { ReactNode } from "react";

interface ButtonTypes {
  type: "button" | "reset" | "submit" | undefined;
  title: string;
  onClick?: () => void;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  extraStyle?: string;
}

const Button: React.FC<ButtonTypes> = ({
  title,
  type,
  iconLeft,
  iconRight,
  onClick,
  extraStyle,
}) => {
  return (
    <button
      className={`bg-green-600 hover:bg-green-700 flex items-center justify-center py-2 px-4 rounded-[6px] text-white gap-1 ${extraStyle}`}
      type={type}
      onClick={onClick}
      aria-label={title}
    >
      {iconLeft && iconLeft}
      {title}
      {iconRight && iconRight}
    </button>
  );
};

export default Button;
