import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No items found", 
  description = "There are no items to display at the moment.", 
  action = null,
  icon = "Package",
  className = "" 
}) => {
  return (
<div className={`flex flex-col items-center justify-center py-20 px-6 text-center ${className}`}>
      <div className="w-28 h-28 bg-gradient-to-br from-forest-green via-medium-green to-leaf-green rounded-full flex items-center justify-center mb-8 shadow-2xl backdrop-blur-md border border-white/30 animate-float">
        <ApperIcon name={icon} className="w-14 h-14 text-white" />
      </div>
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-10 max-w-lg leading-relaxed text-lg">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick} className="shadow-xl px-8 py-4">
          <ApperIcon name={action.icon || "Plus"} className="w-5 h-5 mr-3" />
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default Empty;