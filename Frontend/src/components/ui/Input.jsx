import { cn } from "tailwind-cn";
import React from "react";

const Input = React.forwardRef(
  ({ type = "text", className = "", ...rest }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full border-[1px] border-white bg-transparent rounded-md px-3 py-1 text-base placeholder:text-xs",
          className
        )}
        {...rest}
      />
    );
  }
);

export default Input;
