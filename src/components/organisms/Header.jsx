import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import LoginModal from "@/components/molecules/LoginModal";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const navItems = [
    { name: "Browse Strains", path: "/", icon: "Search" },
    { name: "Seller Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "How It Works", path: "/how-it-works", icon: "HelpCircle" }
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate("/profile");
  };

  const handleMembershipClick = () => {
    setIsUserMenuOpen(false);
    navigate("/membership");
  };

  const handleAdminClick = () => {
    setIsUserMenuOpen(false);
    navigate("/admin/users");
  };

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

{/* Desktop Auth/CTA */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-forest-green hover:bg-forest-green/5 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center">
                    <ApperIcon name="User" className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.firstName}</span>
                  <ApperIcon name="ChevronDown" className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-forest-green font-medium">{user.membershipTier} Member</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ApperIcon name="User" className="w-4 h-4" />
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={handleMembershipClick}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <ApperIcon name="Crown" className="w-4 h-4" />
                      <span>Membership</span>
                    </button>
                    {user.role === 'admin' && (
                      <button
                        onClick={handleAdminClick}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ApperIcon name="Settings" className="w-4 h-4" />
                        <span>User Management</span>
                      </button>
                    )}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <ApperIcon name="LogOut" className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowLoginModal(true)}>
                  Login
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/dashboard")}>
                  <ApperIcon name="Plus" className="w-4 h-4 mr-1" />
                  List Strain
                </Button>
              </>
            )}
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
            {user ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <p className="text-xs text-forest-green font-medium">{user.membershipTier} Member</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleProfileClick();
                  }}
                >
                  <ApperIcon name="User" className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleMembershipClick();
                  }}
                >
                  <ApperIcon name="Crown" className="w-4 h-4 mr-2" />
                  Membership
                </Button>
                {user.role === 'admin' && (
                  <Button 
                    variant="outline" 
                    className="w-full justify-center"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleAdminClick();
                    }}
                  >
                    <ApperIcon name="Settings" className="w-4 h-4 mr-2" />
                    User Management
                  </Button>
                )}
                <Button 
                  variant="primary" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/dashboard");
                  }}
                >
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  List Strain
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-center text-red-600 hover:bg-red-50"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <ApperIcon name="LogOut" className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login / Register
                </Button>
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
List Your Strain
                </Button>
              </div>
            )}
</div>
        </div>
      </motion.div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};

export default Header;