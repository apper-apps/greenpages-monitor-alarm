import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { createStrain, updateStrain, getStrainById } from "@/services/api/strainService";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";
const StrainForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const isEditing = Boolean(id);

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please log in to access strain management");
      navigate("/");
      return;
    }
  }, [isAuthenticated, navigate]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    thcLevel: "",
    cbdLevel: "",
    description: "",
    effects: "",
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    if (isEditing) {
      loadStrain();
    }
  }, [id, isEditing]);

  const loadStrain = async () => {
    try {
      const strain = await getStrainById(parseInt(id));
      setFormData({
        name: strain.name,
        category: strain.category,
        price: strain.price.toString(),
        thcLevel: strain.thcLevel.toString(),
        cbdLevel: strain.cbdLevel.toString(),
        description: strain.description,
        effects: strain.effects.join(", "),
        images: strain.images || []
      });
    } catch (err) {
      toast.error("Failed to load strain data");
      navigate("/dashboard");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + imageFiles.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    setImageFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    const newImageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      const strainData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        thcLevel: parseFloat(formData.thcLevel) || 0,
        cbdLevel: parseFloat(formData.cbdLevel) || 0,
        description: formData.description,
        effects: formData.effects.split(",").map(effect => effect.trim()).filter(Boolean),
        images: formData.images,
        sellerId: "seller1", // Mock seller ID
        active: true
      };

      if (isEditing) {
        await updateStrain(parseInt(id), strainData);
        toast.success("Strain updated successfully!");
      } else {
        await createStrain(strainData);
        toast.success("Strain listed successfully!");
      }

      navigate("/dashboard");
    } catch (err) {
      toast.error(isEditing ? "Failed to update strain" : "Failed to create strain");
      console.error("Error saving strain:", err);
    } finally {
      setLoading(false);
    }
};

  // Don't render form if user is not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 text-center">
          <ApperIcon name="Lock" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-4">You must be logged in and verified to list strains.</p>
          <Button onClick={() => navigate("/")} variant="primary">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center text-forest-green hover:text-medium-green transition-colors mb-4"
        >
          <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-display font-bold text-gray-900">
          {isEditing ? "Edit Strain Listing" : "Add New Strain Listing"}
        </h1>
        <p className="text-gray-600 mt-2">
          {isEditing ? "Update your strain information" : "Create a new listing for your strain"}
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Strain Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Blue Dream"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <Select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  required
                >
                  <option value="sativa">Sativa</option>
                  <option value="indica">Indica</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="exotic">Exotic</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per gram ($) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  THC Level (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.thcLevel}
                  onChange={(e) => handleInputChange("thcLevel", e.target.value)}
                  placeholder="0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CBD Level (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.cbdLevel}
                  onChange={(e) => handleInputChange("cbdLevel", e.target.value)}
                  placeholder="0.0"
                />
              </div>
            </div>
          </div>

          {/* Description & Effects */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Description & Effects
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-forest-green focus:outline-none focus:ring-2 focus:ring-forest-green/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your strain's characteristics, growing conditions, etc."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Effects (comma-separated)
              </label>
              <Input
                value={formData.effects}
                onChange={(e) => handleInputChange("effects", e.target.value)}
                placeholder="e.g., Relaxed, Happy, Euphoric, Creative"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Images (Max 3)
            </h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photos
              </label>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Strain ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <ApperIcon name="X" className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>

              {formData.images.length < 3 && (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-forest-green transition-colors"
                  >
                    <div className="text-center">
                      <ApperIcon name="Upload" className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Upload Images</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading && <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />}
              {isEditing ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StrainForm;