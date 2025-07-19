import { useState } from "react";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      term: searchTerm,
      category,
      priceRange
    });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    onFilterChange({
      category: value,
      priceRange
    });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({
      category,
      priceRange: value
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("");
    setPriceRange("");
    onSearch({ term: "", category: "", priceRange: "" });
    onFilterChange({ category: "", priceRange: "" });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <form onSubmit={handleSearch} className="space-y-4 md:space-y-0 md:flex md:items-end md:space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Strains</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by strain name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <Select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="sativa">Sativa</option>
            <option value="indica">Indica</option>
            <option value="hybrid">Hybrid</option>
            <option value="exotic">Exotic</option>
          </Select>
        </div>

        <div className="w-full md:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <Select value={priceRange} onChange={(e) => handlePriceChange(e.target.value)}>
            <option value="">Any Price</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
            <option value="200+">$200+</option>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button type="submit" variant="primary">
            <ApperIcon name="Search" className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button type="button" variant="outline" onClick={clearFilters}>
            <ApperIcon name="X" className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;