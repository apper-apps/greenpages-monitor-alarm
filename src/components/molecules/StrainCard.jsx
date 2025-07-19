import { useState } from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StrainCard = ({ strain, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  return (
    <Card className={cn(
      "group cursor-pointer overflow-hidden border-l-4 hover:shadow-xl hover:scale-105 transition-all duration-300",
      getCategoryColor(strain.category)
    )}>
      <div onClick={onClick} className="block">
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {!imageError && strain.images && strain.images.length > 0 ? (
            <>
              <img
                src={strain.images[0]}
                alt={strain.name}
                className={cn(
                  "w-full h-full object-cover transition-all duration-300 group-hover:scale-110",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <ApperIcon name="Image" className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <ApperIcon name="Image" className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <Badge variant={getCategoryBadge(strain.category)}>
              {strain.category}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display font-semibold text-gray-900 text-lg group-hover:text-forest-green transition-colors">
              {strain.name}
            </h3>
            <span className="text-xl font-bold text-forest-green">${strain.price}</span>
          </div>

          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">THC:</span>
              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-leaf-green to-forest-green rounded-full"
                  style={{ width: `${Math.min(strain.thcLevel, 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700">{strain.thcLevel}%</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">CBD:</span>
              <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  style={{ width: `${Math.min(strain.cbdLevel, 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700">{strain.cbdLevel}%</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {strain.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {strain.effects?.slice(0, 3).map((effect, index) => (
              <Badge key={index} variant="default" className="text-xs">
                {effect}
              </Badge>
            ))}
            {strain.effects?.length > 3 && (
              <Badge variant="default" className="text-xs">
                +{strain.effects.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="CheckCircle" className="w-4 h-4 text-forest-green" />
              <span>Verified Seller</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StrainCard;