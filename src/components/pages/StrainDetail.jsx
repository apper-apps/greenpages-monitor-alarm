import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import { getStrainById } from "@/services/api/strainService";
import { toast } from "react-toastify";

const StrainDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [strain, setStrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadStrain();
  }, [id]);

  const loadStrain = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getStrainById(parseInt(id));
      setStrain(data);
    } catch (err) {
      setError("Failed to load strain details. Please try again.");
      console.error("Error loading strain:", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      sativa: "border-l-sativa-green",
      indica: "border-l-indica-purple", 
      hybrid: "border-l-hybrid-orange",
      exotic: "border-l-exotic-gold"
    };
    return colors[category?.toLowerCase()] || "border-l-gray-300";
  };

  const getCategoryBadge = (category) => {
    const badges = {
      sativa: "sativa",
      indica: "indica",
      hybrid: "hybrid", 
      exotic: "exotic"
    };
    return badges[category?.toLowerCase()] || "default";
  };

  const handleContactSeller = () => {
    toast.info("Contact seller feature coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Loading variant="list" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Error message={error} onRetry={loadStrain} />
        </div>
      </div>
    );
  }

  if (!strain) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Error message="Strain not found" onRetry={() => navigate("/")} />
        </div>
      </div>
    );
  }

  return (
<div className="min-h-screen gradient-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-forest-green hover:text-medium-green transition-colors mb-6"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-100">
                {strain.images && strain.images.length > 0 ? (
                  <img
                    src={strain.images[selectedImage]}
                    alt={strain.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </Card>
            
            {strain.images && strain.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {strain.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? "border-forest-green ring-2 ring-forest-green/20" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${strain.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant={getCategoryBadge(strain.category)}>
                  {strain.category}
                </Badge>
                <Badge variant="verified">
                  <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                  Verified Seller
                </Badge>
              </div>
              
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                {strain.name}
              </h1>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-forest-green">${strain.price}</span>
                <span className="text-gray-500">per gram</span>
              </div>
            </div>

            {/* THC/CBD Levels */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Potency Levels</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">THC Level</span>
                    <span className="text-sm font-bold text-gray-900">{strain.thcLevel}%</span>
                  </div>
<div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-leaf-green via-medium-green to-forest-green rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${Math.min(strain.thcLevel, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">CBD Level</span>
                    <span className="text-sm font-bold text-gray-900">{strain.cbdLevel}%</span>
                  </div>
<div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full transition-all duration-1000 shadow-sm"
                      style={{ width: `${Math.min(strain.cbdLevel, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Effects */}
            {strain.effects && strain.effects.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Effects</h3>
                <div className="flex flex-wrap gap-2">
                  {strain.effects.map((effect, index) => (
                    <Badge key={index} variant="default">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Description */}
            <Card className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {strain.description || "No description available for this strain."}
              </p>
            </Card>

            {/* Contact Button */}
            <div className="flex space-x-4">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={handleContactSeller}
              >
                <ApperIcon name="MessageCircle" className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast.info("Favorite feature coming soon!")}
              >
                <ApperIcon name="Heart" className="w-4 h-4" />
              </Button>
            </div>

            {/* Seller Info */}
            <Card className="p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center">
                  <ApperIcon name="Store" className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Premium Cannabis Co.</div>
                  <div className="text-sm text-gray-500">License #CA-12345</div>
                </div>
                <Badge variant="verified" className="ml-auto">
                  <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StrainDetail;