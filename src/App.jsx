import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import Loading from "@/components/ui/Loading";
import Header from "@/components/organisms/Header";
import HowItWorks from "@/components/pages/HowItWorks";
import Browse from "@/components/pages/Browse";
import UserManagement from "@/components/pages/UserManagement";
import Membership from "@/components/pages/Membership";
import StrainDetail from "@/components/pages/StrainDetail";
import AddStrain from "@/components/pages/AddStrain";
import Dashboard from "@/components/pages/Dashboard";
import EditStrain from "@/components/pages/EditStrain";
import UserProfile from "@/components/pages/UserProfile";
import AgeVerificationModal from "@/components/molecules/AgeVerificationModal";
import useAgeVerification from "@/hooks/useAgeVerification";
import { UserProvider } from "@/context/UserContext";

function App() {
  const { isVerified, isLoading, verify } = useAgeVerification();
  const [showAgeModal, setShowAgeModal] = useState(false);

  const handleAgeVerification = (data) => {
    verify(data);
    setShowAgeModal(false);
  };

  if (isLoading) {
    return (
<div className="min-h-screen gradient-bg-secondary flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-forest-green via-medium-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow shadow-2xl">
            <div className="w-12 h-12 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-gray-700 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return (
      <>
<div className="min-h-screen gradient-bg-hero flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
          <div className="text-center max-w-2xl mx-auto p-8 relative z-10">
            <div className="w-32 h-32 bg-gradient-to-br from-forest-green via-medium-green to-leaf-green rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl animate-float backdrop-blur-md border border-white/20">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h1 className="text-5xl font-display font-bold text-white mb-6 text-gradient">Welcome to GreenPages</h1>
            <p className="text-gray-200 mb-10 text-xl leading-relaxed">
              A legal cannabis marketplace connecting verified sellers with buyers in legal states. 
              Age verification required to continue.
            </p>
            <button
              onClick={() => setShowAgeModal(true)}
              className="btn-modern inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-green via-medium-green to-leaf-green text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 backdrop-blur-md border border-white/20"
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
    <UserProvider>
<BrowserRouter>
<div className="min-h-screen gradient-bg-secondary">
          <Header />
        <main>
<Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/strain/:id" element={<StrainDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<AddStrain />} />
            <Route path="/dashboard/edit/:id" element={<EditStrain />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Routes>
        </main>

<ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ 
            zIndex: 1000,
            marginTop: '80px'
          }}
        />
</div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;