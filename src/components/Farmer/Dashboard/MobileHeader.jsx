import React from 'react';
import { Bell, User, ArrowLeft, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MobileHeader.css';

const MobileHeader = ({
  title,
  userName,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onLogout,
  onBack,
  onVoiceAssistant,
  showBackButton = false
}) => {
  const navigate = useNavigate();
  return (
    <div className="mobile-header">
      <div className="mobile-header-container">
        {/* Left side */}
        <div className="mobile-header-left">
          {showBackButton && onBack && (
            <button
              className="mobile-header-button"
              onClick={onBack}
            >
              <ArrowLeft className="mobile-header-icon" />
            </button>
          )}
          <div className="mobile-header-titles">
            <h1 className="mobile-header-title">{title}</h1>
            <p className="mobile-header-subtitle">Welcome, {userName}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="mobile-header-right">
          {/* Voice Assistant */}
          {onVoiceAssistant && (
            <button
              className="mobile-header-button"
              onClick={()=>navigate("/voice-assist")}
            >
              <Mic className="mobile-header-icon" />
            </button>
          )}

          {/* Notifications */}
          <button
            className="mobile-header-button mobile-header-notification-btn"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="mobile-header-icon" />
            {notificationCount > 0 && (
              <span className="mobile-header-badge">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>

          {/* Profile Dropdown */}
          <div className="mobile-header-dropdown">
            <button className="mobile-header-button">
              <User className="mobile-header-icon" />
            </button>
            <div className="mobile-header-dropdown-content">
              <div className="mobile-header-dropdown-item" onClick={() => navigate("/profile")}>
                <User className="mobile-header-dropdown-icon" />
                My Profile
              </div>
              <div className="mobile-header-dropdown-item mobile-header-logout" onClick={onLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;