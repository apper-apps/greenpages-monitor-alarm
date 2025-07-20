import { useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import CategoryTabs from "@/components/molecules/CategoryTabs";
import StrainGrid from "@/components/organisms/StrainGrid";

const Browse = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filters, setFilters] = useState({
    term: "",
    category: "all",
    priceRange: ""
  });

  const handleSearch = (searchData) => {
    setFilters(prev => ({
      ...prev,
      term: searchData.term,
      category: searchData.category || prev.category,
      priceRange: searchData.priceRange || prev.priceRange
    }));
  };

  const handleFilterChange = (filterData) => {
    setFilters(prev => ({
      ...prev,
      ...filterData
    }));
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilters(prev => ({
      ...prev,
      category: category
    }));
  };

  return (
<div className="min-h-screen gradient-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
<h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-forest-green via-medium-green to-leaf-green bg-clip-text text-transparent animate-gradient">
              Cannabis Strain
            </span>
          </h1>
<p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Discover premium cannabis strains from verified sellers in legal states. 
            Find exactly what you're looking for with detailed strain information and modern marketplace experience.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CategoryTabs 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange}
          />
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StrainGrid filters={filters} />
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;