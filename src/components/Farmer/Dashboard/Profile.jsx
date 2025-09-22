import React, { useState, useEffect } from "react";
import { User, Phone, MapPin, Calendar, Edit, Save, Camera, Award, TrendingUp, ShoppingBag, LogOut, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = ({ userData, onUpdateProfile, onLogout, onBackToDashboard }) => {
    const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    location: "",
    experience: "",
    role: "farmer"
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Initialize form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleSave = () => {
    if (typeof onUpdateProfile === "function") {
      onUpdateProfile(formData);
      setIsEditing(false);
      setSaveStatus("success");
      
      setTimeout(() => {
        setSaveStatus("");
      }, 3000);
    } else {
      console.log("Profile would be updated with:", formData);
      setIsEditing(false);
      setSaveStatus("no-function");
      
      setTimeout(() => {
        setSaveStatus("");
      }, 3000);
    }
  };

  const handleCancel = () => {
    setFormData(userData || {
      name: "",
      mobile: "",
      location: "",
      experience: "",
      role: "farmer"
    });
    setIsEditing(false);
    setSaveStatus("");
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    alert("Account deletion functionality would be implemented here");
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleBackClick = () => {
    if (typeof onBackToDashboard === "function") {
      onBackToDashboard();
    } else {
      // Fallback if function is not provided
      console.log("Navigate back to dashboard");
      window.history.back();
    }
  };

  // Default data if userData is not provided
  const displayData = userData || {
    name: "Farmer Name",
    mobile: "+91 9876543210",
    location: "Village, District, State",
    experience: "5",
    role: "farmer"
  };

  return (
    <div 
      className="profile-container"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), 
                         url(${process.env.PUBLIC_URL}/images/farming.png)`
      }}
    >
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-btn cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="modal-btn confirm-btn" onClick={confirmDelete}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Status Messages */}
      {saveStatus === "success" && (
        <div className="status-message success">
          <span>Profile updated successfully!</span>
        </div>
      )}
      
      {saveStatus === "no-function" && (
        <div className="status-message info">
          <span>Profile update simulated (onUpdateProfile function not provided)</span>
        </div>
      )}

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate("/farmer")}>
        <ArrowLeft className="back-icon" />
        Back
      </button>

      <div className="profile-content">
        {/* Personal Information Card */}
        <div className="profile-card">
          <div className="card-header">
            <div className="card-title-container">
              <h2 className="card-title">Personal Information</h2>
              {!isEditing ? (
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  <Edit className="icon-sm" />
                  Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button className="save-btn" onClick={handleSave}>
                    <Save className="icon-sm" />
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="card-content">
            {/* Profile Picture */}
            <div className="profile-picture-section">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  <User className="avatar-icon" />
                </div>
                {isEditing && (
                  <button className="camera-btn">
                    <Camera className="camera-icon" />
                  </button>
                )}
              </div>
              <div className="profile-info">
                <h3 className="profile-name">{displayData.name}</h3>
                <p className="profile-role">Farmer</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="form-fields">
              <div className="field-group">
                <label htmlFor="name">Full Name</label>
                {isEditing ? (
                  <input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <p className="field-value">{displayData.name}</p>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="mobile">Mobile Number</label>
                {isEditing ? (
                  <input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                ) : (
                  <p className="field-value">{displayData.mobile}</p>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="location">Location</label>
                {isEditing ? (
                  <input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                ) : (
                  <p className="field-value">{displayData.location}</p>
                )}
              </div>

              <div className="field-group">
                <label htmlFor="experience">Years of Experience</label>
                {isEditing ? (
                  <input
                    id="experience"
                    value={formData.experience || ""}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  />
                ) : (
                  <p className="field-value">{displayData.experience || "Not specified"}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Farming Details Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2 className="card-title">Farming Details</h2>
          </div>
          <div className="card-content">
            <div className="farming-grid">
              <div className="farming-info">
                <label className="info-label">Land Size</label>
                <p className="info-value">5 acres</p>
              </div>
              <div className="farming-info">
                <label className="info-label">Soil Type</label>
                <p className="info-value">Clay Loam</p>
              </div>
            </div>
            
            <div className="field-group">
              <label className="info-label">Crops Grown</label>
              <div className="crops-container">
                <span className="crop-badge">Rice</span>
                <span className="crop-badge">Wheat</span>
                <span className="crop-badge">Sugarcane</span>
              </div>
            </div>
            
            <div className="field-group">
              <label className="info-label">Last Yield</label>
              <p className="info-value">45 quintals (Rice - 2024)</p>
            </div>
          </div>
        </div>

        {/* Recent Activities Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2 className="card-title">Recent Activities</h2>
          </div>
          <div className="card-content">
            <div className="activity-list">
              <div className="activity-item">
                <TrendingUp className="activity-icon green" />
                <div className="activity-details">
                  <p className="activity-title">AI Crop Suggestion</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </div>
              
              <div className="activity-item">
                <Award className="activity-icon blue" />
                <div className="activity-details">
                  <p className="activity-title">Soil Test Completed</p>
                  <p className="activity-time">1 day ago</p>
                </div>
              </div>
              
              <div className="activity-item">
                <ShoppingBag className="activity-icon orange" />
                <div className="activity-details">
                  <p className="activity-title">Market Price Alert</p>
                  <p className="activity-time">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2 className="card-title">Preferences</h2>
          </div>
          <div className="card-content">
            <div className="preference-list">
              <div className="preference-item">
                <label className="preference-label">Weather Notifications</label>
                <span className="preference-badge enabled">Enabled</span>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">Market Alerts</label>
                <span className="preference-badge enabled">Enabled</span>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">AI Recommendations</label>
                <span className="preference-badge enabled">Enabled</span>
              </div>
              
              <div className="preference-item">
                <label className="preference-label">Voice Assistant</label>
                <span className="preference-badge disabled">Disabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions Card */}
        <div className="profile-card">
          <div className="card-header">
            <h2 className="card-title">Account Actions</h2>
          </div>
          <div className="card-content">
            <div className="actions-list">
              {onLogout && typeof onLogout === "function" ? (
                <button 
                  className="action-btn logout-btn"
                  onClick={onLogout}
                >
                  <LogOut className="btn-icon" />
                  Sign Out
                </button>
              ) : (
                <button 
                  className="action-btn logout-btn"
                  onClick={() => console.log("Logout clicked")}
                >
                  <LogOut className="btn-icon" />
                  Sign Out
                </button>
              )}
              
              <button 
                className="action-btn delete-btn"
                onClick={handleDeleteAccount}
              >
                <Trash2 className="btn-icon" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  userData: {
    name: "Farmer Name",
    mobile: "+91 9876543210",
    location: "Village, District, State",
    experience: "5",
    role: "farmer"
  },
  onUpdateProfile: null,
  onLogout: null,
  onBackToDashboard: null
};

export default Profile;