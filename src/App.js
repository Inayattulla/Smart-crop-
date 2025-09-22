import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";

import FarmerDashboard from "./components/Farmer/Dashboard/FarmerDashboard";
import CropAdvisory from "./components/Farmer/CropAdvisory/CropAdvisory";
import AISuggestions from "./components/Farmer/CropAdvisory/AISuggestions";
import SoilTesting from "./components/Farmer/CropAdvisory/SoilTesting";
import DiseaseDetection from "./components/Farmer/CropAdvisory/DiseaseDetection";
import GrowthSchedule from "./components/Farmer/CropAdvisory/GrowthSchedule";
import GovernmentSchemes from "./components/Farmer/govtschemes/GovernmentSchemes";
import { VoiceAssistant } from "./components/Farmer/Dashboard/VoiceAssistant";
import Market from "./components/Farmer/MarketSales/Market";
import NotificationPanel from "./components/Farmer/Dashboard/Notifications";
import Profile from "./components/Farmer/Dashboard/Profile";

import RoleSelection from './RoleSelection';
import BuyerDashboard from './BuyerDashboard';
import BuyerOrders from './BuyerOrders';

import './styles.css';

// Wrapper for RoleSelection to handle navigation on role select
function RoleSelectWrapper({ setRole }) {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setRole(role);
    if(role === 'buyer') {
      navigate('/buyer');
    } else if(role === 'farmer') {
      navigate('/farmer');
    } else {
      navigate('/');
    }
  };

  return <RoleSelection setRole={handleRoleSelect} />;
}

const App = () => {
  const [role, setRole] = useState('');

  return (
    <Router>
      <Routes>
        {/* Route to RoleSelection if no role set */}
        {!role && (
          <Route path="*" element={<RoleSelectWrapper setRole={setRole} />} />
        )}

        {/* Root redirect based on role */}
        {role && (
          <Route
            path="/"
            element={
              <Navigate to={role === 'buyer' ? "/buyer" : "/farmer"} replace />
            }
          />
        )}

        {/* Farmer routes */}
        <Route path="/farmer" element={role === 'farmer' ? <FarmerDashboard /> : <Navigate to="/" />} />
        <Route path="/crop-advisory" element={role === 'farmer' ? <CropAdvisory userLocation="Punjab, India" /> : <Navigate to="/" />} />
        <Route path="/AI-suggestions" element={role === 'farmer' ? <AISuggestions userLocation="Punjab, India" /> : <Navigate to="/" />} />
        <Route path="/Soil-testing" element={role === 'farmer' ? <SoilTesting userLocation="Punjab, India" /> : <Navigate to="/" />} />
        <Route path="/disease-detection" element={role === 'farmer' ? <DiseaseDetection userLocation="Punjab, India" /> : <Navigate to="/" />} />
        <Route path="/growth-schedule" element={role === 'farmer' ? <GrowthSchedule userLocation="Punjab, India" /> : <Navigate to="/" />} />
        <Route path="/govt-schemes" element={role === 'farmer' ? <GovernmentSchemes /> : <Navigate to="/" />} />
        <Route path="/voice-assist" element={role === 'farmer' ? <VoiceAssistant isOpen={true} onClose={() => window.history.back()} userRole="farmer" /> : <Navigate to="/" />} />
        <Route path="/market" element={role === 'farmer' ? <Market /> : <Navigate to="/" />} />
        <Route path="/notifications" element={role === 'farmer' ? <NotificationPanel isOpen={true} onClose={() => window.history.back()} userRole="farmer" /> : <Navigate to="/" />} />
        <Route path="/profile" element={role === 'farmer' ? <Profile /> : <Navigate to="/" />} />

        {/* Buyer routes */}
        <Route path="/buyer" element={role === 'buyer' ? <BuyerDashboard /> : <Navigate to="/" />} />
        <Route path="/buyer/orders" element={role === 'buyer' ? <BuyerOrders onBack={() => window.history.back()} /> : <Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;
