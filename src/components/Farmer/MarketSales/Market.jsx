import React, { useState } from 'react';
import './Market.css';
import { useNavigate } from 'react-router-dom';

// Mock data for the market
const mockFarmerCrops = [
  {
    id: "fc1",
    name: "Basmati Rice",
    image: "https://images.unsplash.com/photo-1695150601855-f545034a070a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwZmFybWluZyUyMGhhcnZlc3R8ZW58MXx8fHwxNzU3NjEzNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 2350,
    quantity: 25,
    quality: "Premium",
    harvestDate: "2024-11-15",
    description: "High-quality basmati rice from organic farming. Long grain, aromatic variety.",
    isOrganic: true,
    status: "available",
    views: 45,
    inquiries: 8
  },
  {
    id: "fc2", 
    name: "Organic Wheat",
    image: "https://images.unsplash.com/photo-1645300637412-92b8c84cf06c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGNyb3AlMjBmaWVsZHxlbnwxfHx8fDE3NTc1OTA2MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: 2800,
    quantity: 15,
    quality: "Premium",
    harvestDate: "2024-12-01",
    description: "Certified organic wheat, pesticide-free cultivation with natural fertilizers.",
    isOrganic: true,
    status: "available",
    views: 32,
    inquiries: 5
  }
];

const mockBuyerInquiries = [
  {
    id: "bi1",
    buyerName: "Mumbai Grocers Pvt Ltd",
    cropName: "Basmati Rice",
    cropId: "fc1",
    quantity: 10,
    offeredPrice: 2300,
    message: "Looking for regular supply of premium basmati rice. Can you provide monthly 10 quintal supply?",
    date: "2024-12-09",
    status: "pending",
    buyerRating: 4.8,
    buyerLocation: "Mumbai, Maharashtra"
  },
  {
    id: "bi2",
    buyerName: "Delhi Organic Foods",
    cropName: "Organic Wheat",
    cropId: "fc2", 
    quantity: 8,
    offeredPrice: 2750,
    message: "Need certified organic wheat for our health food products. Quality certificate required.",
    date: "2024-12-08",
    status: "pending",
    buyerRating: 4.6,
    buyerLocation: "Delhi, India"
  }
];

const mockMarketTrends = [
  {
    crop: "Rice",
    currentPrice: 2400,
    previousPrice: 2200,
    change: 9.1,
    trend: "up",
    demandLevel: "high"
  },
  {
    crop: "Wheat", 
    currentPrice: 2750,
    previousPrice: 2800,
    change: -1.8,
    trend: "down",
    demandLevel: "medium"
  },
  {
    crop: "Tomatoes",
    currentPrice: 1300,
    previousPrice: 1300,
    change: 0,
    trend: "stable",
    demandLevel: "high"
  }
];

const Market = ({ userData, onBackToDashboard }) => {
  // Initialize navigate hook
  const navigate = useNavigate();
  
  // All hooks must be called at the top level (not conditionally)
  const [selectedMarketTab, setSelectedMarketTab] = useState("trends");
  const [showAddCropForm, setShowAddCropForm] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [cropForm, setCropForm] = useState({
    cropType: "",
    quantity: "",
    price: "",
    quality: "",
    harvestDate: "",
    description: "",
    isOrganic: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCropForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitCrop = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Crop submitted:", cropForm);
    setShowAddCropForm(false);
    // Reset form
    setCropForm({
      cropType: "",
      quantity: "",
      price: "",
      quality: "",
      harvestDate: "",
      description: "",
      isOrganic: false
    });
  };

  // Render functions for different tabs
  const renderMarketTrends = () => (
    <div className="market-tab-content">
      <h3 className="market-section-title">Market Price Trends</h3>
      
      <div className="market-trends-list">
        {mockMarketTrends.map((trend, index) => (
          <div 
            key={trend.crop} 
            className="market-trend-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="market-trend-content">
              <div className="market-trend-info">
                <h4 className="market-trend-crop">{trend.crop}</h4>
                <p className="market-trend-label">Current market price</p>
              </div>
              <div className="market-trend-price">
                <div className="market-trend-value">₹{trend.currentPrice}</div>
                <div className="market-trend-change">
                  <span className={`market-trend-icon ${
                    trend.trend === 'up' ? 'market-trend-up' :
                    trend.trend === 'down' ? 'market-trend-down' :
                    'market-trend-stable'
                  }`}>
                    {trend.trend === 'up' ? '↗' : trend.trend === 'down' ? '↘' : '→'}
                  </span>
                  <span className={`market-trend-percentage ${
                    trend.trend === 'up' ? 'market-trend-up' :
                    trend.trend === 'down' ? 'market-trend-down' :
                    'market-trend-stable'
                  }`}>
                    {trend.change > 0 ? '+' : ''}{trend.change.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="market-trend-footer">
              <div className="market-trend-demand">
                <span className="market-trend-demand-label">Demand:</span>
                <span className={`market-trend-demand-badge ${
                  trend.demandLevel === 'high' ? 'market-demand-high' :
                  trend.demandLevel === 'medium' ? 'market-demand-medium' :
                  'market-demand-low'
                }`}>
                  {trend.demandLevel.charAt(0).toUpperCase() + trend.demandLevel.slice(1)}
                </span>
              </div>
              <p className="market-trend-previous">
                Previous: ₹{trend.previousPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBuyerInquiries = () => (
    <div className="market-tab-content">
      <h3 className="market-section-title">Buyer Inquiries</h3>
      
      <div className="market-inquiries-list">
        {mockBuyerInquiries.map((inquiry, index) => (
          <div 
            key={inquiry.id} 
            className="market-inquiry-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="market-inquiry-header">
              <div className="market-inquiry-buyer">
                <h4 className="market-inquiry-name">{inquiry.buyerName}</h4>
                <p className="market-inquiry-location">{inquiry.buyerLocation}</p>
                <div className="market-inquiry-rating">
                  <span className="market-rating-star">★</span>
                  <span className="market-rating-value">{inquiry.buyerRating}</span>
                </div>
              </div>
              <div className="market-inquiry-status">
                <span className={`market-status-badge ${
                  inquiry.status === 'pending' ? 'market-status-pending' :
                  inquiry.status === 'accepted' ? 'market-status-accepted' :
                  'market-status-rejected'
                }`}>
                  {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="market-inquiry-details">
              <div className="market-inquiry-detail">
                <span className="market-detail-label">Crop:</span>
                <span className="market-detail-value">{inquiry.cropName}</span>
              </div>
              <div className="market-inquiry-detail">
                <span className="market-detail-label">Quantity:</span>
                <span className="market-detail-value">{inquiry.quantity} quintals</span>
              </div>
              <div className="market-inquiry-detail">
                <span className="market-detail-label">Offered Price:</span>
                <span className="market-detail-value">₹{inquiry.offeredPrice}/quintal</span>
              </div>
              <div className="market-inquiry-detail">
                <span className="market-detail-label">Date:</span>
                <span className="market-detail-value">{new Date(inquiry.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="market-inquiry-message">
              <p>{inquiry.message}</p>
            </div>
            
            {inquiry.status === 'pending' && (
              <div className="market-inquiry-actions">
                <button className="market-action-button market-action-accept">
                  Accept Offer
                </button>
                <button className="market-action-button market-action-reject">
                  Reject
                </button>
                <button className="market-action-button market-action-call">
                  <span className="market-call-icon">📞</span>
                  Call
                </button>
              </div>
            )}
            
            {inquiry.status === 'accepted' && (
              <div className="market-inquiry-actions">
                <button className="market-action-button market-action-contact">
                  <span className="market-call-icon">📞</span>
                  Contact Buyer
                </button>
                <button className="market-action-button market-action-contract">
                  View Contract
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSellCrops = () => (
    <div className="market-tab-content">
      {/* Add New Crop Button */}
      <div className="market-sell-header">
        <h3 className="market-section-title">Sell Your Crops</h3>
        <button 
          className="market-add-crop-button"
          onClick={() => setShowAddCropForm(true)}
        >
          <span className="market-add-icon">+</span>
          Add New Crop
        </button>
      </div>

      {/* Sell Crop Form */}
      {showAddCropForm && (
        <div className="market-crop-form-container">
          <div className="market-crop-form">
            <h3 className="market-form-title">List Your Crop for Sale</h3>
            
            <form onSubmit={handleSubmitCrop}>
              <div className="market-form-group">
                <label htmlFor="crop-type" className="market-form-label">Crop Type</label>
                <select 
                  id="crop-type"
                  name="cropType"
                  value={cropForm.cropType}
                  onChange={handleInputChange}
                  className="market-form-select"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="rice">Rice</option>
                  <option value="wheat">Wheat</option>
                  <option value="sugarcane">Sugarcane</option>
                  <option value="cotton">Cotton</option>
                  <option value="corn">Corn</option>
                  <option value="tomatoes">Tomatoes</option>
                  <option value="onions">Onions</option>
                </select>
              </div>
              
              <div className="market-form-group">
                <label htmlFor="quantity" className="market-form-label">Quantity (Quintals)</label>
                <input 
                  id="quantity"
                  name="quantity"
                  type="number" 
                  placeholder="Enter quantity"
                  value={cropForm.quantity}
                  onChange={handleInputChange}
                  className="market-form-input"
                  required
                />
              </div>
              
              <div className="market-form-group">
                <label htmlFor="price" className="market-form-label">Expected Price per Quintal</label>
                <input 
                  id="price"
                  name="price"
                  type="number" 
                  placeholder="Enter price (₹)"
                  value={cropForm.price}
                  onChange={handleInputChange}
                  className="market-form-input"
                  required
                />
              </div>
              
              <div className="market-form-group">
                <label htmlFor="quality" className="market-form-label">Quality Grade</label>
                <select 
                  id="quality"
                  name="quality"
                  value={cropForm.quality}
                  onChange={handleInputChange}
                  className="market-form-select"
                  required
                >
                  <option value="">Select quality</option>
                  <option value="premium">Premium</option>
                  <option value="grade-a">Grade A</option>
                  <option value="grade-b">Grade B</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
              
              <div className="market-form-group">
                <label htmlFor="harvest-date" className="market-form-label">Harvest Date</label>
                <input 
                  id="harvest-date"
                  name="harvestDate"
                  type="date"
                  value={cropForm.harvestDate}
                  onChange={handleInputChange}
                  className="market-form-input"
                  required
                />
              </div>
              
              <div className="market-form-group">
                <label htmlFor="description" className="market-form-label">Description</label>
                <textarea 
                  id="description"
                  name="description"
                  placeholder="Describe crop quality, farming method, etc."
                  rows={3}
                  value={cropForm.description}
                  onChange={handleInputChange}
                  className="market-form-textarea"
                  required
                />
              </div>
              
              <div className="market-form-group">
                <label className="market-form-label">Crop Images</label>
                <div className="market-image-upload">
                  <div className="market-upload-placeholder">
                    <span className="market-upload-icon">📷</span>
                    <p className="market-upload-text">Add photos of your crop</p>
                    <button type="button" className="market-upload-button">
                      Upload Images
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="market-form-checkbox">
                <input 
                  id="organic"
                  name="isOrganic"
                  type="checkbox"
                  checked={cropForm.isOrganic}
                  onChange={handleInputChange}
                  className="market-checkbox-input"
                />
                <label htmlFor="organic" className="market-checkbox-label">
                  This crop is organically grown
                </label>
              </div>
              
              <div className="market-form-actions">
                <button type="submit" className="market-submit-button market-submit-primary">
                  <span className="market-cart-icon">🛒</span>
                  List for Direct Sale
                </button>
                <button type="button" className="market-submit-button market-submit-secondary">
                  <span className="market-govt-icon">📄</span>
                  Send to Government Procurement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Your Active Listings */}
      <div className="market-listings">
        <h3 className="market-section-title">Your Active Listings</h3>
        
        <div className="market-listings-grid">
          {mockFarmerCrops.map((crop, index) => (
            <div 
              key={crop.id} 
              className="market-listing-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="market-listing-content">
                <div className="market-listing-image">
                  <img src={crop.image} alt={crop.name} />
                </div>
                
                <div className="market-listing-details">
                  <div className="market-listing-header">
                    <div>
                      <h3 className="market-listing-name">{crop.name}</h3>
                      <div className="market-listing-badges">
                        {crop.isOrganic && (
                          <span className="market-badge market-badge-organic">Organic</span>
                        )}
                        <span className={`market-badge ${
                          crop.status === 'available' ? 'market-badge-available' :
                          crop.status === 'reserved' ? 'market-badge-reserved' :
                          'market-badge-sold'
                        }`}>
                          {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="market-listing-price">
                      <div className="market-price-value">₹{crop.price}</div>
                      <div className="market-price-label">per quintal</div>
                    </div>
                  </div>
                  
                  <div className="market-listing-stats">
                    <div className="market-listing-stat">
                      <span className="market-stat-icon">📦</span>
                      <span className="market-stat-value">{crop.quantity} quintals</span>
                    </div>
                    <div className="market-listing-stat">
                      <span className="market-stat-icon">👁️</span>
                      <span className="market-stat-value">{crop.views} views</span>
                    </div>
                    <div className="market-listing-stat">
                      <span className="market-stat-icon">💬</span>
                      <span className="market-stat-value">{crop.inquiries} inquiries</span>
                    </div>
                  </div>
                  
                  <div className="market-listing-date">
                    <span className="market-date-icon">📅</span>
                    <span className="market-date-text">
                      Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="market-listing-actions">
                    <button className="market-listing-button market-listing-edit">
                      <span className="market-button-icon">✏️</span>
                      Edit
                    </button>
                    <button className="market-listing-button market-listing-view">
                      <span className="market-button-icon">👁️</span>
                      View Details
                    </button>
                    <button 
                      className="market-listing-button market-listing-promote"
                      disabled={crop.status === 'sold'}
                    >
                      <span className="market-button-icon">📈</span>
                      Promote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="market-container">
      {/* Back Button */}
      <div className="market-back-container">
        <button 
          className="market-back-button"
          onClick={() => navigate("/farmer")} // Fixed missing closing parenthesis
        >
          <span className="market-back-icon">←</span>
          Back
        </button>
      </div>

      {/* Market Overview Cards */}
      <div className="market-overview-cards">
        <div className="market-card">
          <div className="market-card-icon">📦</div>
          <div className="market-card-content">
            <div className="market-card-value">{mockFarmerCrops.length}</div>
            <div className="market-card-label">Listed Crops</div>
          </div>
        </div>
        
        <div className="market-card">
          <div className="market-card-icon">💬</div>
          <div className="market-card-content">
            <div className="market-card-value">
              {mockBuyerInquiries.filter(inq => inq.status === 'pending').length}
            </div>
            <div className="market-card-label">New Inquiries</div>
          </div>
        </div>
      </div>

      {/* Market Navigation Tabs */}
      <div className="market-tabs">
        <button 
          className={`market-tab ${selectedMarketTab === "trends" ? "market-tab-active" : ""}`}
          onClick={() => setSelectedMarketTab("trends")}
        >
          Market Trends
        </button>
        <button 
          className={`market-tab ${selectedMarketTab === "inquiries" ? "market-tab-active" : ""}`}
          onClick={() => setSelectedMarketTab("inquiries")}
        >
          Inquiries
        </button>
        <button 
          className={`market-tab ${selectedMarketTab === "sell" ? "market-tab-active" : ""}`}
          onClick={() => setSelectedMarketTab("sell")}
        >
          Sell Crops
        </button>
      </div>

      {/* Render the appropriate tab content */}
      {selectedMarketTab === "trends" && renderMarketTrends()}
      {selectedMarketTab === "inquiries" && renderBuyerInquiries()}
      {selectedMarketTab === "sell" && renderSellCrops()}
    </div>
  );
};

export default Market;