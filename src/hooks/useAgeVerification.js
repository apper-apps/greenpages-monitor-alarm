import { useState, useEffect } from "react";

const useAgeVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already been verified
    const verificationData = localStorage.getItem("ageVerificationData");
    if (verificationData) {
      try {
        const data = JSON.parse(verificationData);
        const verificationDate = new Date(data.timestamp);
        const now = new Date();
        const hoursDiff = (now - verificationDate) / (1000 * 60 * 60);
        
        // Verification expires after 24 hours
        if (hoursDiff < 24) {
          setIsVerified(true);
        } else {
          localStorage.removeItem("ageVerificationData");
        }
      } catch (error) {
        console.error("Error parsing verification data:", error);
        localStorage.removeItem("ageVerificationData");
      }
    }
    setIsLoading(false);
  }, []);

  const verify = (verificationData) => {
    const data = {
      ...verificationData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem("ageVerificationData", JSON.stringify(data));
    setIsVerified(true);
  };

  const clearVerification = () => {
    localStorage.removeItem("ageVerificationData");
    setIsVerified(false);
  };

  return {
    isVerified,
    isLoading,
    verify,
    clearVerification
  };
};

export default useAgeVerification;