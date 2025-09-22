import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, TrendingUp, Camera, ShoppingCart, User } from 'lucide-react';
import './BottomNavigator.css';

const BottomNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'dashboard';
    if (path === '/crop-advisory') return 'adviser';
    if (path === '/scan') return 'scan';
    if (path === '/market') return 'market';
    if (path === '/profile') return 'profile';
    return 'dashboard'; // default
  };
  
  const activeTab = getActiveTab();
  
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", path: "/dashboard" },
    { id: "adviser", icon: TrendingUp, label: "Crop Adviser", path: "/crop-advisory" },
    { id: "scan", icon: Camera, label: "Scan", path: "/disease-detection" },
    { id: "market", icon: ShoppingCart, label: "Market", path: "/market" },
    { id: "profile", icon: User, label: "Profile", path: "/profile" }
  ];

  const handleTabChange = (path) => {
    navigate(path);
  };

  return (
    <div className="bottom-navigation">
      <div className="bottom-navigation-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isScan = item.id === "scan";
          
          return (
            <button
              key={item.id}
              className={`bottom-nav-item ${isActive ? 'active' : ''} ${isScan ? 'scan-item' : ''}`}
              onClick={() => handleTabChange(item.path)}
            >
              {isScan ? (
                <div className="scan-button">
                  <Icon className="scan-icon" />
                </div>
              ) : (
                <Icon className="nav-icon" />
              )}
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigator;