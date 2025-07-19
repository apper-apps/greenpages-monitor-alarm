import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Header from "@/components/organisms/Header";
import Browse from "@/components/pages/Browse";
import StrainDetail from "@/components/pages/StrainDetail";
import Dashboard from "@/components/pages/Dashboard";
import AddStrain from "@/components/pages/AddStrain";
import EditStrain from "@/components/pages/EditStrain";
import HowItWorks from "@/components/pages/HowItWorks";
import AgeVerificationModal from "@/components/molecules/AgeVerificationModal";
import useAgeVerification from "@/hooks/useAgeVerification";

function App() {
  const { isVerified, isLoading, verify } = useAgeVerification();
  const [showAgeModal, setShowAgeModal] = useState(false);

  const handleAgeVerification = (data) => {
    verify(data);
    setShowAgeModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-full"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-20 h-20 bg-gradient-to-br from-forest-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Welcome to GreenPages</h1>
            <p className="text-gray-600 mb-8">
              A legal cannabis marketplace connecting verified sellers with buyers in legal states. 
              Age verification required to continue.
            </p>
            <button
              onClick={() => setShowAgeModal(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-forest-green to-medium-green text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Verify Age & Continue
            </button>
          </div>
        </div>
        
        <AgeVerificationModal
          isOpen={showAgeModal}
          onVerify={handleAgeVerification}
          onClose={() => setShowAgeModal(false)}
        />
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/strain/:id" element={<StrainDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<AddStrain />} />
            <Route path="/dashboard/edit/:id" element={<EditStrain />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
          </Routes>
        </main>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;