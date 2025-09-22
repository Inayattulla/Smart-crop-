import React, { useState } from "react";
import { ArrowLeft, TrendingUp,  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AISuggestions.css";

const AISuggestions = ({ userLocation, onBack }) => {
    const navigate = useNavigate();
  const [season, setSeason] = useState("");

  return (
    <div className="service-detail-container">
      <div className="service-header">
        <button 
          className="back-btn"
          onClick={() => navigate("/crop-advisory")}
        >
          <ArrowLeft className="back-icon" />
          Back
        </button>
        <h2 className="service-title">AI Crop Suggestions</h2>
      </div>

      <div className="service-card">
        <div className="form-group">
          <label htmlFor="season">Select Season</label>
          <select 
            id="season" 
            className="form-select"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="">Choose season</option>
            <option value="kharif">Kharif (Monsoon)</option>
            <option value="rabi">Rabi (Winter)</option>
            <option value="summer">Summer</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input 
            id="location" 
            type="text" 
            className="form-input"
            placeholder="Enter your location" 
            value={userLocation} 
            readOnly
          />
        </div>
        
        <button className="primary-btn full-width">
          <TrendingUp className="btn-icon" />
          Get AI Recommendations
        </button>
        
        {/* Sample AI Recommendations */}
        <div className="recommendations-section">
          <h3 className="section-title">Recommended Crops for Your Region:</h3>
          
          <div className="recommendation-card success">
            <div className="recommendation-header">
              <h4>Rice (Basmati)</h4>
              <span className="match-badge">95% Match</span>
            </div>
            <p className="recommendation-desc">Ideal for your soil type and current weather conditions</p>
            <div className="recommendation-details">
              <p>• Expected yield: 40-45 quintals/acre</p>
              <p>• Market price: ₹2,100-2,400/quintal</p>
              <p>• Planting time: June-July</p>
            </div>
          </div>
          
          <div className="recommendation-card warning">
            <div className="recommendation-header">
              <h4>Sugarcane</h4>
              <span className="match-badge">88% Match</span>
            </div>
            <p className="recommendation-desc">Good option with high water availability</p>
            <div className="recommendation-details">
              <p>• Expected yield: 400-450 quintals/acre</p>
              <p>• Market price: ₹280-320/quintal</p>
              <p>• Planting time: February-March</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;