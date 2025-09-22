import React from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./GrowthSchedule.css";

const GrowthSchedule = ({ onBack, userLocation }) => {
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
        <h2 className="service-title">Growth Schedule</h2>
      </div>

      <div className="service-card">
        <div className="schedule-list">
          <div className="schedule-item success">
            <div className="schedule-indicator"></div>
            <div className="schedule-content">
              <p className="schedule-title">Rice - Transplanting</p>
              <p className="schedule-subtitle">Field A (2 acres)</p>
            </div>
            <div className="schedule-progress">
              <p className="progress-text">Week 3</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="schedule-item warning">
            <div className="schedule-indicator"></div>
            <div className="schedule-content">
              <p className="schedule-title">Wheat - Flowering</p>
              <p className="schedule-subtitle">Field B (1.5 acres)</p>
            </div>
            <div className="schedule-progress">
              <p className="progress-text">Week 12</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '85%'}}></div>
              </div>
            </div>
          </div>
          
          <div className="schedule-item info">
            <div className="schedule-indicator"></div>
            <div className="schedule-content">
              <p className="schedule-title">Sugarcane - Growing</p>
              <p className="schedule-subtitle">Field C (1 acre)</p>
            </div>
            <div className="schedule-progress">
              <p className="progress-text">Week 20</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '45%'}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="upcoming-activities">
          <h3 className="section-title">Upcoming Activities</h3>
          <div className="activity-list">
            <div className="activity-item warning">
              <Calendar className="activity-icon" />
              <div className="activity-content">
                <p className="activity-title">Apply fertilizer to wheat</p>
                <p className="activity-time">Tomorrow, 8:00 AM</p>
              </div>
            </div>
            
            <div className="activity-item info">
              <Calendar className="activity-icon" />
              <div className="activity-content">
                <p className="activity-title">Harvest rice crop</p>
                <p className="activity-time">In 2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthSchedule;