import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
import SellerDashboard from "@/components/organisms/SellerDashboard";
import Loading from "@/components/ui/Loading";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication after loading completes
    if (!isLoading && !isAuthenticated) {
      toast.error("Please log in to access the seller dashboard");
      navigate("/");
      return;
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading during authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg-secondary flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Show authentication required message if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen gradient-bg-secondary flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4">
              <ApperIcon name="Lock" className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">Authentication Required</h2>
            <p className="text-gray-600 mb-6">You must be logged in to access the seller dashboard.</p>
            <Button 
              onClick={() => navigate("/")} 
              variant="primary"
              className="w-full"
            >
              <ApperIcon name="Home" className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Render dashboard for authenticated users
  return (
    <div className="min-h-screen gradient-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SellerDashboard />
      </div>
    </div>
  );
};

export default Dashboard;