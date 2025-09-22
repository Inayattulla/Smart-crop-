import React, { useState } from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./DiseaseDetection.css";

const DiseaseDetection = ({ onBack }) => {
    const navigate = useNavigate();
  const [selectedCrop, setSelectedCrop] = useState("");
  const [diseaseImage, setDiseaseImage] = useState(null);

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
        <h2 className="service-title">Disease Detection</h2>
      </div>

      <div className="service-card">
        <div className="form-group">
          <label htmlFor="crop-select">Select Crop</label>
          <select 
            id="crop-select" 
            className="form-select"
            value={selectedCrop} 
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">Choose your crop</option>
            <option value="rice">Rice</option>
            <option value="wheat">Wheat</option>
            <option value="sugarcane">Sugarcane</option>
            <option value="cotton">Cotton</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Upload Crop Image</label>
          <div className="image-upload-area">
            {diseaseImage ? (
              <div className="image-preview">
                <img src={diseaseImage} alt="Uploaded crop" />
                <button 
                  className="outline-btn"
                  onClick={() => setDiseaseImage(null)}
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="upload-placeholder">
                <div className="upload-icon">
                  <AlertTriangle className="icon" />
                </div>
                <p className="upload-text">Tap to take a photo or upload image</p>
                <div className="upload-buttons">
                  <button className="outline-btn small">Camera</button>
                  <button className="outline-btn small">Upload</button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          className="primary-btn full-width" 
          disabled={!selectedCrop}
        >
          Analyze for Diseases
        </button>
        
        {/* Sample Disease Detection Result */}
        {selectedCrop && (
          <div className="result-card error">
            <div className="result-header">
              <AlertTriangle className="result-icon" />
              <div className="result-content">
                <h4>Leaf Blight Detected</h4>
                <p className="result-confidence">Confidence: 92%</p>
              </div>
            </div>
            <div className="result-details">
              <h5>Recommended Treatment:</h5>
              <ul>
                <li>• Apply fungicide spray (Carbendazim 50% WP)</li>
                <li>• Improve field drainage</li>
                <li>• Remove infected plant parts</li>
                <li>• Follow crop rotation</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;