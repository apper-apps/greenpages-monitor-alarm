import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import SubscriptionBanner from "@/components/molecules/SubscriptionBanner";
import ApperIcon from "@/components/ApperIcon";
import { getSellerStrains, deleteStrain } from "@/services/api/strainService";
import { getSellerSubscription } from "@/services/api/subscriptionService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const [strains, setStrains] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [strainsData, subscriptionData] = await Promise.all([
        getSellerStrains("seller1"), // Mock seller ID
        getSellerSubscription("seller1")
      ]);
      
      setStrains(strainsData);
      setSubscription(subscriptionData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleDeleteStrain = async (strainId) => {
    if (window.confirm("Are you sure you want to delete this strain listing?")) {
      try {
        await deleteStrain(strainId);
        setStrains(strains.filter(strain => strain.Id !== strainId));
        toast.success("Strain listing deleted successfully");
      } catch (err) {
        toast.error("Failed to delete strain listing");
        console.error("Error deleting strain:", err);
      }
    }
  };

  const handleEditStrain = (strainId) => {
    navigate(`/dashboard/edit/${strainId}`);
  };

  const handleUpgradeSubscription = () => {
    toast.info("Subscription upgrade feature coming soon!");
  };

  if (loading) {
    return <Loading variant="list" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadDashboardData} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your strain listings and subscription</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" onClick={() => navigate("/dashboard/add")}>
            <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </div>
      </div>

      {/* Subscription Banner */}
      <SubscriptionBanner 
        subscription={subscription} 
        onUpgrade={handleUpgradeSubscription}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">{strains.filter(s => s.active).length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center">
              <ApperIcon name="List" className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{strains.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <ApperIcon name="Package" className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Subscription Status</p>
              <Badge variant={subscription?.status === "active" ? "success" : "error"}>
                {subscription?.status || "Unknown"}
              </Badge>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <ApperIcon name="CreditCard" className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Listings Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-display font-semibold text-gray-900">Your Listings</h2>
        </div>

        {strains.length === 0 ? (
          <div className="p-6">
            <Empty
              icon="Package"
              title="No listings yet"
              description="Create your first strain listing to start connecting with buyers."
              action={{
                label: "Add Your First Listing",
                icon: "Plus",
                onClick: () => navigate("/dashboard/add")
              }}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Strain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {strains.map((strain) => (
                  <motion.tr
                    key={strain.Id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                          {strain.images && strain.images.length > 0 ? (
                            <img
                              src={strain.images[0]}
                              alt={strain.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ApperIcon name="Image" className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{strain.name}</div>
                          <div className="text-sm text-gray-500">THC: {strain.thcLevel}% | CBD: {strain.cbdLevel}%</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={strain.category?.toLowerCase() || "default"}>
                        {strain.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${strain.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={strain.active ? "success" : "error"}>
                        {strain.active ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStrain(strain.Id)}
                        >
                          <ApperIcon name="Edit" className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStrain(strain.Id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <ApperIcon name="Trash2" className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SellerDashboard;