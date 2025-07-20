import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children, 
  ...props 
}, ref) => {
const variants = {
    default: "glass text-gray-800 border border-gray-300/30 backdrop-blur-md",
    sativa: "bg-gradient-to-r from-sativa-green/20 to-sativa-green/10 text-sativa-green border border-sativa-green/30 shadow-sm",
    indica: "bg-gradient-to-r from-indica-purple/20 to-indica-purple/10 text-indica-purple border border-indica-purple/30 shadow-sm",
    hybrid: "bg-gradient-to-r from-hybrid-orange/20 to-hybrid-orange/10 text-hybrid-orange border border-hybrid-orange/30 shadow-sm",
    exotic: "bg-gradient-to-r from-exotic-gold/20 to-exotic-gold/10 text-exotic-gold border border-exotic-gold/30 shadow-sm",
    verified: "bg-gradient-to-r from-forest-green/20 to-leaf-green/10 text-forest-green border border-forest-green/30 shadow-sm",
    success: "bg-gradient-to-r from-green-500/20 to-green-400/10 text-green-800 border border-green-400/30 shadow-sm",
    warning: "bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 text-yellow-800 border border-yellow-400/30 shadow-sm",
    error: "bg-gradient-to-r from-red-500/20 to-red-400/10 text-red-800 border border-red-400/30 shadow-sm"
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