import React, { useState } from "react";
import { ArrowLeft, FileText, Calendar, CheckCircle, Clock, AlertCircle, ExternalLink, Search } from "lucide-react";
import { useNavigate } from "react-router-dom"; 
import "./GovernmentSchemes.css";

const GovernmentSchemes = ({ onBack, userRole }) => {
    const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const mockSchemes = [
    {
      id: "1",
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      description: "Income support scheme providing ₹6,000 per year to farmer families in three equal installments of ₹2,000 each.",
      amount: "₹6,000 per year",
      eligibility: [
        "Small and marginal farmer families",
        "Land holding up to 2 hectares",
        "Valid Aadhaar card required",
        "Bank account linked to Aadhaar"
      ],
      deadline: "Ongoing",
      status: "approved",
      category: "income-support",
      documents: ["Aadhaar Card", "Bank Account Details", "Land Records", "Mobile Number"],
      benefits: [
        "Direct cash transfer to bank account",
        "No paperwork required after registration",
        "Automatic transfer every 4 months"
      ]
    },
    {
      id: "2",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme to protect farmers against crop loss due to natural calamities, pests, and diseases.",
      amount: "Up to ₹2 lakh per hectare",
      eligibility: [
        "All farmers (sharecroppers & tenant farmers included)",
        "Registered for notified crops",
        "Premium payment before cut-off date",
        "Valid land documents"
      ],
      deadline: "December 31, 2024",
      status: "active",
      category: "insurance",
      documents: ["Land Records", "Aadhaar Card", "Bank Account", "Crop Details", "Sowing Certificate"],
      benefits: [
        "Coverage for pre-sowing to post-harvest",
        "Low premium rates (1.5% for Kharif, 2% for Rabi)",
        "Technology-based claim settlement"
      ]
    },
    {
      id: "3",
      title: "Soil Health Card Scheme",
      description: "Provides farmers with soil health cards containing crop-wise recommendations to improve soil fertility and productivity.",
      amount: "Free soil testing",
      eligibility: [
        "All farmers",
        "Land holding farmers",
        "Valid land records",
        "One card per 2.5 hectare"
      ],
      deadline: "March 31, 2025",
      status: "applied",
      category: "soil-health",
      documents: ["Land Records", "Aadhaar Card", "Bank Account"],
      benefits: [
        "Free soil testing every 3 years",
        "Customized fertilizer recommendations",
        "Improved crop productivity"
      ]
    },
    {
      id: "4",
      title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
      description: "Irrigation scheme to expand cultivable area under assured irrigation and improve water use efficiency.",
      amount: "Up to ₹10 lakh subsidy",
      eligibility: [
        "Individual farmers",
        "Water User Associations",
        "Self Help Groups",
        "Cooperative societies"
      ],
      deadline: "January 15, 2025",
      status: "active",
      category: "irrigation",
      documents: ["Project Proposal", "Land Records", "Water Source Certificate", "Technical Approval"],
      benefits: [
        "75% subsidy for drip/sprinkler systems",
        "Water conservation techniques",
        "Improved crop yield"
      ]
    },
    {
      id: "5",
      title: "National Agriculture Market (e-NAM)",
      description: "Online trading platform for agricultural commodities to provide better price discovery and transparency.",
      amount: "Market access platform",
      eligibility: [
        "Registered farmers",
        "Valid FPO membership",
        "Quality produce",
        "Mobile phone with internet"
      ],
      deadline: "Ongoing",
      status: "active",
      category: "marketing",
      documents: ["Registration Certificate", "Quality Certificate", "Bank Account", "Mobile Number"],
      benefits: [
        "Better price discovery",
        "Reduced transaction costs",
        "Wider market access"
      ]
    },
    {
      id: "6",
      title: "Pradhan Mantri Kisan Maandhan Yojana",
      description: "Pension scheme for small and marginal farmers providing assured monthly pension of ₹3,000 after 60 years.",
      amount: "₹3,000 monthly pension",
      eligibility: [
        "Age 18-40 years",
        "Small & marginal farmers",
        "Land holding up to 2 hectares",
        "Not covered under other pension schemes"
      ],
      deadline: "Ongoing",
      status: "expired",
      category: "pension",
      documents: ["Aadhaar Card", "Bank Account", "Land Records", "Age Proof"],
      benefits: [
        "Guaranteed monthly pension",
        "Family pension in case of death",
        "Low contribution (₹55-₹200 per month)"
      ]
    }
  ];

  const categories = [
    { id: "all", label: "All Schemes" },
    { id: "income-support", label: "Income Support" },
    { id: "insurance", label: "Insurance" },
    { id: "soil-health", label: "Soil Health" },
    { id: "irrigation", label: "Irrigation" },
    { id: "marketing", label: "Marketing" },
    { id: "pension", label: "Pension" }
  ];

  const statusFilters = [
    { id: "all", label: "All Status" },
    { id: "active", label: "Active" },
    { id: "applied", label: "Applied" },
    { id: "approved", label: "Approved" },
    { id: "expired", label: "Expired" }
  ];

  const filteredSchemes = mockSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || scheme.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "status-badge-approved";
      case "applied": return "status-badge-applied";
      case "active": return "status-badge-active";
      case "expired": return "status-badge-expired";
      default: return "status-badge-default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle className="w-4 h-4" />;
      case "applied": return <Clock className="w-4 h-4" />;
      case "active": return <AlertCircle className="w-4 h-4" />;
      case "expired": return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleApplyScheme = (schemeId) => {
    console.log("Applying for scheme:", schemeId);
    // Handle scheme application
  };

  return (
    <div className="government-schemes-container">
      {/* Back Button */}
      <div className="schemes-header-sticky">
        <button 
          onClick={()=>navigate("/farmer")}
          className="back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

      {/* Header */}
      <div className="schemes-header">
        <h2 className="schemes-title">Government Schemes</h2>
        <p className="schemes-subtitle">Explore and apply for agricultural schemes and subsidies</p>
      </div>
      </div>

      {/* Search and Filters */}
      <div className="schemes-filter-card">
        <div className="filter-content">
          <div className="search-container">
            <Search className="search-icon" />
            <input 
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-grid">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="filter-select"
            >
              {statusFilters.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-number approved">2</p>
          <p className="stat-label">Approved</p>
        </div>
        
        <div className="stat-card">
          <p className="stat-number applied">1</p>
          <p className="stat-label">Applied</p>
        </div>
        
        <div className="stat-card">
          <p className="stat-number active">3</p>
          <p className="stat-label">Available</p>
        </div>
      </div>

      {/* Schemes List */}
      <div className="schemes-list">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <div className="scheme-content">
              {/* Header */}
              <div className="scheme-header-flex">
                <div className="scheme-header-left">
                  <h3 className="scheme-title">{scheme.title}</h3>
                  <div className="badge-container">
                    <span className={`status-badge ${getStatusColor(scheme.status)}`}>
                      {getStatusIcon(scheme.status)}
                      <span className="status-text">{scheme.status}</span>
                    </span>
                    <span className="category-badge">
                      {categories.find(c => c.id === scheme.category)?.label}
                    </span>
                  </div>
                </div>
                
                <div className="scheme-header-right">
                  <p className="scheme-amount">{scheme.amount}</p>
                  <p className="scheme-amount-label">Benefit</p>
                </div>
              </div>

              {/* Description */}
              <p className="scheme-description">{scheme.description}</p>

              {/* Key Benefits */}
              <div className="scheme-benefits">
                <p className="benefits-title">Key Benefits:</p>
                <div className="benefits-list">
                  {scheme.benefits.slice(0, 2).map((benefit, index) => (
                    <p key={index}>• {benefit}</p>
                  ))}
                </div>
              </div>

              {/* Deadline */}
              <div className="deadline-container">
                <Calendar className="deadline-icon" />
                <div>
                  <p className="deadline-title">Application Deadline</p>
                  <p className="deadline-date">{scheme.deadline}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="action-buttons">
                {scheme.status === "active" && (
                  <button 
                    className="primary-btn apply-btn"
                    onClick={() => handleApplyScheme(scheme.id)}
                  >
                    Apply Now
                  </button>
                )}
                
                {scheme.status === "applied" && (
                  <button className="outline-btn pending-btn">
                    <Clock className="btn-icon" />
                    Pending Review
                  </button>
                )}
                
                {scheme.status === "approved" && (
                  <button className="outline-btn status-btn">
                    <CheckCircle className="btn-icon" />
                    View Status
                  </button>
                )}
                
                <button className="icon-btn">
                  <ExternalLink className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <div className="empty-state">
          <FileText className="empty-icon" />
          <p className="empty-title">No schemes found</p>
          <p className="empty-subtitle">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default GovernmentSchemes;