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
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      <div className="w-20 h-20 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name={icon} className="w-10 h-10 text-white" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{description}</p>
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          <ApperIcon name={action.icon || "Plus"} className="w-4 h-4 mr-2" />
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default Empty;