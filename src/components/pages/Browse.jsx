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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-forest-green to-leaf-green bg-clip-text text-transparent">
              Cannabis Strain
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover premium cannabis strains from verified sellers in legal states. 
            Find exactly what you're looking for with detailed strain information.
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