import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  children,
  placeholder = "Select option...",
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
className={cn(
          "flex h-12 w-full rounded-xl border-2 border-gray-200/50 glass backdrop-blur-md px-4 py-3 text-sm focus:border-forest-green focus:outline-none focus:ring-4 focus:ring-forest-green/20 focus:scale-105 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 appearance-none pr-12",
          className
        )}
        ref={ref}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {children}
      </select>
      <ApperIcon 
        name="ChevronDown" 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
      />
    </div>
  );
});

Select.displayName = "Select";

export default Select;