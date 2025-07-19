import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { id: "all", name: "All Strains", icon: "Grid3X3", color: "text-gray-600" },
    { id: "sativa", name: "Sativa", icon: "Sun", color: "text-sativa-green" },
    { id: "indica", name: "Indica", icon: "Moon", color: "text-indica-purple" },
    { id: "hybrid", name: "Hybrid", icon: "Zap", color: "text-hybrid-orange" },
    { id: "exotic", name: "Exotic", icon: "Star", color: "text-exotic-gold" }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105",
            activeCategory === category.id
              ? "bg-gradient-to-r from-forest-green to-medium-green text-white shadow-lg"
              : "bg-white border border-gray-200 text-gray-600 hover:border-forest-green hover:text-forest-green hover:shadow-md"
          )}
        >
          <ApperIcon name={category.icon} className={cn("w-4 h-4", activeCategory === category.id ? "text-white" : category.color)} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;