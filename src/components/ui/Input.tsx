import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const Input = (props: InputProps) => {
  return (
    <input
      className="border-none h-9 mb-2 rounded px-2 outline-none bg-gray-600 text-white"
      {...props}
    />
  );
};
