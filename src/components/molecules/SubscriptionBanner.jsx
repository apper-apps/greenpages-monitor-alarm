import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const SubscriptionBanner = ({ subscription, onUpgrade }) => {
  if (!subscription) return null;

  const isExpired = subscription.status === "expired";
  const isExpiringSoon = subscription.daysRemaining <= 7 && subscription.daysRemaining > 0;

  if (subscription.status === "active" && !isExpiringSoon) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg p-4 mb-6 border-l-4 ${
        isExpired 
          ? "bg-red-50 border-l-red-500" 
          : "bg-yellow-50 border-l-yellow-500"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${
            isExpired ? "bg-red-100" : "bg-yellow-100"
          }`}>
            <ApperIcon 
              name={isExpired ? "AlertTriangle" : "Clock"} 
              className={`w-5 h-5 ${
                isExpired ? "text-red-600" : "text-yellow-600"
              }`} 
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-gray-900">
                {isExpired ? "Subscription Expired" : "Subscription Expiring Soon"}
              </h3>
              <Badge variant={isExpired ? "error" : "warning"}>
                {isExpired ? "Expired" : `${subscription.daysRemaining} days left`}
              </Badge>
            </div>
            <p className="text-gray-700 text-sm">
              {isExpired 
                ? "Your subscription has expired. Renew now to continue posting listings."
                : `Your subscription expires in ${subscription.daysRemaining} days. Renew now to avoid interruption.`
              }
            </p>
          </div>
        </div>
        
        <Button 
          variant="primary" 
          size="sm"
          onClick={onUpgrade}
          className="ml-4 flex-shrink-0"
        >
          <ApperIcon name="CreditCard" className="w-4 h-4 mr-1" />
          Renew Now
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionBanner;