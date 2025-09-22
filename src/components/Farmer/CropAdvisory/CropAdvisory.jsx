import React, { useState } from "react";
import { ArrowLeft, Sprout, Calendar, AlertTriangle, MapPin, TrendingUp, Thermometer, Droplets, Cloud, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CropAdvisory.css";

const CropAdvisory = ({ onBack, userLocation }) => {
  const navigate = useNavigate();
  const [selectedService] = useState(null);
  
  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: 15,
    soilMoisture: 70
  };

  const renderServiceMenu = () => (
    <div className="crop-advisory-container">
      {/* Weather Overview */}
      <div className="weather-card">
        <div className="weather-header">
          <Sun className="weather-icon" />
          <h2>Current Conditions - {userLocation}</h2>
        </div>
        <div className="weather-grid">
          <div className="weather-item">
            <Thermometer className="item-icon temp" />
            <div>
              <p className="item-label">Temperature</p>
              <p className="item-value">{weatherData.temperature}°C</p>
            </div>
          </div>
          
          <div className="weather-item">
            <Droplets className="item-icon humidity" />
            <div>
              <p className="item-label">Humidity</p>
              <p className="item-value">{weatherData.humidity}%</p>
            </div>
          </div>
          
          <div className="weather-item">
            <Cloud className="item-icon rain" />
            <div>
              <p className="item-label">Rainfall</p>
              <p className="item-value">{weatherData.rainfall}mm</p>
            </div>
          </div>
          
          <div className="weather-item">
            <Sprout className="item-icon soil" />
            <div>
              <p className="item-label">Soil Moisture</p>
              <p className="item-value">{weatherData.soilMoisture}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Options */}
      <div className="services-section">
        <h2 className="services-title">Crop Advisory Services</h2>
        
        <div className="services-grid">
          <button 
            onClick={()=>navigate("/ai-suggestions")}
            className="service-btn ai-suggestions"
          >
            <div className="service-icon">
              <TrendingUp className="icon" />
            </div>
            <div className="service-content">
              <p className="service-name">AI Suggestions</p>
              <p className="service-desc">Get smart crop recommendations</p>
            </div>
          </button>
          
          <button 
            onClick={()=>navigate("/disease-detection")}
            className="service-btn disease-detection"
          >
            <div className="service-icon">
              <AlertTriangle className="icon" />
            </div>
            <div className="service-content">
              <p className="service-name">Disease Detection</p>
              <p className="service-desc">Diagnose crop health issues</p>
            </div>
          </button>
          
          <button 
            onClick={()=>navigate("/soil-testing")}
            className="service-btn soil-testing"
          >
            <div className="service-icon">
              <MapPin className="icon" />
            </div>
            <div className="service-content">
              <p className="service-name">Soil Testing</p>
              <p className="service-desc">Analyze soil health & nutrients</p>
            </div>
          </button>
          
          <button 
            onClick={()=>navigate("/growth-schedule")}
            className="service-btn growth-schedule"
          >
            <div className="service-icon">
              <Calendar className="icon" />
            </div>
            <div className="service-content">
              <p className="service-name">Growth Schedule</p>
              <p className="service-desc">Track farming activities</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="crop-advisory-page">
      <div className="crop-advisory-header">
        <div className="header-content">
          {/* Only show the main back button when on the service menu */}
          {!selectedService && (
            <button 
              className="back-btn header-back"
              onClick={() => navigate("/farmer")}
            >
              <ArrowLeft className="back-icon" />
              Back
            </button>
          )}
          <div className="header-title">
            <h1>Crop Advisory</h1>
            <p className="location">
              <MapPin className="location-icon" />
              {userLocation}
            </p>
          </div>
        </div>
      </div>

      {!selectedService && renderServiceMenu()}
    </div>
  );
};

export default CropAdvisory;