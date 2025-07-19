import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-forest-green to-medium-green text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
    secondary: "bg-white text-forest-green border-2 border-forest-green hover:bg-forest-green hover:text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-forest-green hover:text-forest-green hover:shadow-md hover:scale-105 active:scale-95",
    ghost: "text-forest-green hover:bg-forest-green/10 hover:scale-105 active:scale-95"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;