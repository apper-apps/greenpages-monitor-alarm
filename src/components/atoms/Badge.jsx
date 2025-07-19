import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    sativa: "bg-sativa-green/10 text-sativa-green border border-sativa-green/20",
    indica: "bg-indica-purple/10 text-indica-purple border border-indica-purple/20",
    hybrid: "bg-hybrid-orange/10 text-hybrid-orange border border-hybrid-orange/20",
    exotic: "bg-exotic-gold/10 text-exotic-gold border border-exotic-gold/20",
    verified: "bg-forest-green/10 text-forest-green border border-forest-green/20",
    success: "bg-green-100 text-green-800 border border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    error: "bg-red-100 text-red-800 border border-red-200"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;