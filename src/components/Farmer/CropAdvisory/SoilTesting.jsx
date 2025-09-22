import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./SoilTesting.css";

const SoilTesting = ({ onBack }) => {
    const navigate = useNavigate();
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
        <h2 className="service-title">Soil Testing</h2>
      </div>

      <div className="service-card">
        <div className="action-buttons">
          <button className="primary-btn large">
            <MapPin className="btn-icon" />
            <div className="btn-content">
              <p className="btn-title">Book Nearest Lab</p>
              <p className="btn-subtitle">Find labs in your area</p>
            </div>
          </button>
          
          <button className="outline-btn large">
            <div className="btn-icon">
              <span className="file-icon">📄</span>
            </div>
            <div className="btn-content">
              <p className="btn-title">Upload Soil Report</p>
              <p className="btn-subtitle">Get AI analysis</p>
            </div>
          </button>
        </div>
        
        {/* Sample Soil Analysis */}
        <div className="soil-analysis">
          <h3 className="section-title">Latest Soil Analysis</h3>
          
          <div className="soil-stats">
            <div className="soil-stat success">
              <p className="stat-value">7.2</p>
              <p className="stat-label">pH Level</p>
              <span className="stat-badge">Good</span>
            </div>
            
            <div className="soil-stat warning">
              <p className="stat-value">Medium</p>
              <p className="stat-label">Nitrogen</p>
              <span className="stat-badge">Fair</span>
            </div>
            
            <div className="soil-stat error">
              <p className="stat-value">Low</p>
              <p className="stat-label">Phosphorus</p>
              <span className="stat-badge">Need Attention</span>
            </div>
          </div>
          
          <div className="recommendation-card info">
            <h5>AI Recommendations:</h5>
            <ul>
              <li>• Apply DAP fertilizer to increase phosphorus levels</li>
              <li>• Consider organic compost for long-term soil health</li>
              <li>• Rice and wheat are suitable for current soil conditions</li>
              <li>• Test again after 6 months</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilTesting;