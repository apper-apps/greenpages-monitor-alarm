import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StrainForm from "@/components/organisms/StrainForm";
import { useUser } from "@/context/UserContext";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const AddStrain = () => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please register and verify your account to list strains");
      navigate("/");
      return;
    }
  }, [isAuthenticated, navigate]);

  // Show authentication required message if not logged in
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <ApperIcon name="UserCheck" className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
                Registration & Verification Required
              </h1>
              <p className="text-gray-600 mb-6">
                To list strains on our platform, you must:
              </p>
              <div className="text-left mb-8 space-y-2">
                <div className="flex items-center text-gray-700">
                  <ApperIcon name="Check" className="w-5 h-5 text-forest-green mr-3" />
                  <span>Create a verified account</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ApperIcon name="Check" className="w-5 h-5 text-forest-green mr-3" />
                  <span>Complete KYC verification</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ApperIcon name="Check" className="w-5 h-5 text-forest-green mr-3" />
                  <span>Confirm legal age and location</span>
                </div>
              </div>
              <div className="flex space-x-4 justify-center">
                <Button onClick={() => navigate("/")} variant="outline">
                  Go to Home
                </Button>
                <Button onClick={() => navigate("/profile")} variant="primary">
                  <ApperIcon name="UserPlus" className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StrainForm />
      </div>
    </div>
  );
};

export default AddStrain;