import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const buyerSteps = [
    {
      icon: "Shield",
      title: "Verify Your Age & Location",
      description: "Complete our secure age verification and confirm you're in a legal cannabis state."
    },
    {
      icon: "Search",
      title: "Browse Premium Strains",
      description: "Explore verified strain listings with detailed information, effects, and pricing."
    },
    {
      icon: "MessageCircle",
      title: "Connect with Sellers",
      description: "Contact verified sellers directly to arrange your purchase safely."
    }
  ];

  const sellerSteps = [
    {
      icon: "FileText",
      title: "Create Your Listing",
      description: "Add strain details, photos, pricing, and effects to attract buyers."
    },
    {
      icon: "CreditCard",
      title: "Choose Subscription",
      description: "Select monthly or yearly subscription to keep your listings active."
    },
    {
      icon: "TrendingUp",
      title: "Grow Your Business",
      description: "Manage listings, track performance, and connect with customers."
    }
  ];

  const features = [
    {
      icon: "CheckCircle",
      title: "Verified Sellers",
      description: "All sellers are licensed and verified for your safety."
    },
    {
      icon: "MapPin",
      title: "Legal States Only",
      description: "Platform operates only in states where cannabis is legal."
    },
    {
      icon: "Lock",
      title: "Secure Platform",
      description: "Your data and transactions are protected with enterprise security."
    },
    {
      icon: "Star",
      title: "Quality Strains",
      description: "Find premium cannabis strains with detailed information."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            How
            <span className="bg-gradient-to-r from-forest-green to-leaf-green bg-clip-text text-transparent">
              {" "}GreenPages{" "}
            </span>
            Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted platform for connecting legal cannabis buyers and sellers. 
            Safe, verified, and compliant with state regulations.
          </p>
        </motion.div>

        {/* For Buyers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">For Buyers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and purchase premium cannabis strains from verified sellers in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {buyerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={step.icon} className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-forest-green text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="primary" onClick={() => navigate("/")}>
              <ApperIcon name="Search" className="w-4 h-4 mr-2" />
              Start Browsing Strains
            </Button>
          </div>
        </motion.section>

        {/* For Sellers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">For Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              List your premium strains and connect with customers through our subscription platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sellerSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-200">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={step.icon} className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-forest-green text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="primary" onClick={() => navigate("/dashboard")}>
              <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
              Start Selling
            </Button>
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">Why Choose GreenPages?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform prioritizes safety, compliance, and quality to create the best cannabis marketplace experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-all duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Subscription Pricing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">Simple Subscription Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="p-8 border-2 border-gray-200 hover:border-forest-green transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Monthly</h3>
              <div className="text-3xl font-bold text-forest-green mb-4">$29/mo</div>
              <p className="text-gray-600 mb-6">Perfect for testing the waters</p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Unlimited strain listings
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Basic analytics
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Customer messaging
                </li>
              </ul>
              <Button variant="outline" className="w-full">Choose Monthly</Button>
            </Card>

            <Card className="p-8 border-2 border-forest-green bg-gradient-to-br from-forest-green/5 to-leaf-green/5 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-forest-green text-white px-3 py-1 rounded-full text-sm font-medium">
                  Best Value
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Yearly</h3>
              <div className="text-3xl font-bold text-forest-green mb-1">$25/mo</div>
              <div className="text-sm text-gray-500 mb-4">Billed annually ($300)</div>
              <p className="text-gray-600 mb-6">Save $48 per year</p>
              <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Unlimited strain listings
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Priority customer support
                </li>
                <li className="flex items-center">
                  <ApperIcon name="Check" className="w-4 h-4 text-forest-green mr-2" />
                  Featured listings
                </li>
              </ul>
              <Button variant="primary" className="w-full">Choose Yearly</Button>
            </Card>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HowItWorks;