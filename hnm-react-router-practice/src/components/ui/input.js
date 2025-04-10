import * as React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full max-w-lg rounded-lg border bg-white text-black px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-orange-300",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
