import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Browse Strains", path: "/", icon: "Search" },
    { name: "Seller Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "How It Works", path: "/how-it-works", icon: "HelpCircle" }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-green to-leaf-green rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <ApperIcon name="Leaf" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-gray-900 group-hover:text-forest-green transition-colors">
              GreenPages
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105",
                  isActive(item.path)
                    ? "bg-gradient-to-r from-forest-green to-medium-green text-white shadow-lg"
                    : "text-gray-600 hover:text-forest-green hover:bg-forest-green/5"
                )}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
              List Strain
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-forest-green hover:bg-forest-green/5 transition-colors"
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive(item.path)
                  ? "bg-gradient-to-r from-forest-green to-medium-green text-white shadow-lg"
                  : "text-gray-600 hover:text-forest-green hover:bg-forest-green/5"
              )}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            <Button 
              variant="primary" 
              className="w-full justify-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/dashboard");
              }}
            >
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              List Your Strain
            </Button>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;