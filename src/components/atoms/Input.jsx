import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  ...props 
}, ref) => {
  return (
    <input
      type={type}
className={cn(
        "flex h-12 w-full rounded-xl border-2 border-gray-200/50 glass backdrop-blur-md px-4 py-3 text-sm placeholder:text-gray-500 focus:border-forest-green focus:outline-none focus:ring-4 focus:ring-forest-green/20 focus:scale-105 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;