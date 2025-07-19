import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const AgeVerificationModal = ({ isOpen, onVerify, onClose }) => {
  const [birthDate, setBirthDate] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState("");

  const legalStates = [
    "California", "Colorado", "Connecticut", "Delaware", "Illinois", "Maine", 
    "Massachusetts", "Michigan", "Nevada", "New Jersey", "New Mexico", 
    "New York", "Oregon", "Rhode Island", "Vermont", "Virginia", "Washington"
  ];

  const handleVerify = () => {
    setError("");
    
    if (!birthDate || !selectedState) {
      setError("Please fill in all fields");
      return;
    }

    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 21) {
      setError("You must be 21 or older to access this platform");
      return;
    }

    if (!legalStates.includes(selectedState)) {
      setError("Cannabis sales are not currently legal in your state");
      return;
    }

    onVerify({ age, state: selectedState });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name="Shield" className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Age Verification</h2>
              <p className="text-gray-600">You must be 21+ and in a legal state to continue</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                  {legalStates.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </Select>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ApperIcon name="AlertCircle" className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleVerify} className="flex-1">
                  Verify & Continue
                </Button>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500 text-center">
              By continuing, you confirm that you are of legal age and in a legal jurisdiction for cannabis products.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerificationModal;