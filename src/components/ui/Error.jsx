import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong. Please try again.", onRetry, className = "" }) => {
  return (
<div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-full flex items-center justify-center mb-8 shadow-lg backdrop-blur-md border border-red-300/30 animate-pulse-glow">
        <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary" className="shadow-xl">
          <ApperIcon name="RotateCcw" className="w-5 h-5 mr-3" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;