import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Cloud, Sun, Droplets, Wind, Thermometer, FileText, TrendingUp, BarChart3, PieChart
} from "lucide-react";
import MobileHeader from './MobileHeader';
import BottomNavigator from './BottomNavigator';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import { Progress } from "../../../ui/progress";
import { Tabs, TabsContent} from "../../../ui/tabs";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderAnalytics = () => (
    <div className="analytics-space-y">
      {/* Crop Performance */}
      <Card className="agri-card-shadow">
        <CardHeader className="analytics-card-header">
          <CardTitle className="analytics-card-title">
            <BarChart3 className="analytics-icon" />
            Crop Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="analytics-card-content">
          <div className="analytics-space-y">
            <div className="analytics-crop-item analytics-crop-success">
              <div className="analytics-crop-info">
                <div className="analytics-crop-indicator analytics-indicator-success"></div>
                <div>
                  <p className="analytics-crop-name">Rice (Basmati)</p>
                  <p className="analytics-crop-details">2.5 acres</p>
                </div>
              </div>
              <div className="analytics-crop-stats">
                <p className="analytics-crop-yield analytics-yield-success">42 quintals</p>
                <p className="analytics-crop-details">Expected: 40</p>
              </div>
            </div>
            
            <div className="analytics-crop-item analytics-crop-warning">
              <div className="analytics-crop-info">
                <div className="analytics-crop-indicator analytics-indicator-warning"></div>
                <div>
                  <p className="analytics-crop-name">Wheat</p>
                  <p className="analytics-crop-details">1.5 acres</p>
                </div>
              </div>
              <div className="analytics-crop-stats">
                <p className="analytics-crop-yield analytics-yield-warning">18 quintals</p>
                <p className="analytics-crop-details">Expected: 20</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Analytics */}
      <Card className="agri-card-shadow">
        <CardHeader className="analytics-card-header">
          <CardTitle className="analytics-card-title">
            <TrendingUp className="analytics-icon" />
            Revenue Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="analytics-card-content">
          <div className="analytics-revenue-grid">
            <div className="analytics-revenue-item analytics-revenue-success">
              <p className="analytics-revenue-amount">₹98,500</p>
              <p className="analytics-revenue-label">This Month</p>
              <Badge className="analytics-badge analytics-badge-success">+12%</Badge>
            </div>
            
            <div className="analytics-revenue-item analytics-revenue-info">
              <p className="analytics-revenue-amount">₹2,85,000</p>
              <p className="analytics-revenue-label">This Year</p>
              <Badge className="analytics-badge analytics-badge-info">+8%</Badge>
            </div>
          </div>
          
          <div className="analytics-progress-container">
            <div className="analytics-progress-header">
              <span className="analytics-progress-label">Revenue Progress</span>
              <span className="analytics-progress-value">68% of target</span>
            </div>
            <Progress value={68} className="analytics-progress-bar" />
          </div>
        </CardContent>
      </Card>

      {/* Expense Tracking */}
      <Card className="agri-card-shadow">
        <CardHeader className="analytics-card-header">
          <CardTitle className="analytics-card-title">
            <PieChart className="analytics-icon" />
            Expense Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="analytics-card-content">
          <div className="analytics-expense-item">
            <div className="analytics-expense-header">
              <span className="analytics-expense-name">Seeds & Fertilizers</span>
              <span className="analytics-expense-value">₹45,000 (42%)</span>
            </div>
            <Progress value={42} className="analytics-progress-bar" />
          </div>
          
          <div className="analytics-expense-item">
            <div className="analytics-expense-header">
              <span className="analytics-expense-name">Labor & Equipment</span>
              <span className="analytics-expense-value">₹35,000 (33%)</span>
            </div>
            <Progress value={33} className="analytics-progress-bar" />
          </div>
          
          <div className="analytics-expense-item">
            <div className="analytics-expense-header">
              <span className="analytics-expense-name">Water & Irrigation</span>
              <span className="analytics-expense-value">₹15,000 (14%)</span>
            </div>
            <Progress value={14} className="analytics-progress-bar" />
          </div>
          
          <div className="analytics-expense-item">
            <div className="analytics-expense-header">
              <span className="analytics-expense-name">Others</span>
              <span className="analytics-expense-value">₹12,000 (11%)</span>
            </div>
            <Progress value={11} className="analytics-progress-bar" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="dashboard-container">
      <MobileHeader
        title="Farmer Dashboard"
        userName="User"
        notificationCount={5}
        onNotificationClick={() => console.log('Notification clicked')}
        onProfileClick={() => console.log('Profile clicked')}
        onLogout={() => console.log('Logout clicked')}
        onVoiceAssistant={() => console.log('Voice assistant clicked')}
        showBackButton={true}
      />
      
      <div className="dashboard-content">
        {/* Weather Section */}
        <section className="card weather-card" style={{ marginTop: "13px" }}>
          <h3 className="card-title">
            <Cloud className="icon" />
            Today's Weather
          </h3>
          <div className="weather-content">
            <div className="weather-main">
              <Sun className="weather-icon" />
              <div>
                <span className="temp">28°C</span>
                <p>Partly Cloudy</p>
              </div>
            </div>
            <div className="weather-details">
              <p className="location">Punjab, India</p>
              <p className="time">Today, 2:30 PM</p>
            </div>
          </div>
          <div className="weather-stats">
            <div className="weather-stat">
              <Droplets className="stat-icon" />
              <p>Humidity</p>
              <span>68%</span>
            </div>
            <div className="weather-stat">
              <Wind className="stat-icon" />
              <p>Wind</p>
              <span>12 km/h</span>
            </div>
            <div className="weather-stat">
              <Thermometer className="stat-icon" />
              <p>Feels like</p>
              <span>31°C</span>
            </div>
          </div>
        </section>

        {/* Government Schemes */}
        <section className="card schemes-card">
          <h3 className="card-title">
            <FileText className="icon" />
            Government Schemes
            <button className="view-all-btn" onClick={() => navigate("/govt-schemes")}>View All</button>
          </h3>
          <div className="scheme active">
            <div className="scheme-header">
              <div>
                <h4>PM-KISAN Scheme</h4>
                <p>Direct income support for farmers</p>
              </div>
              <span className="tag active">Active</span>
            </div>
            <small>Next installment: ₹2,000 due in 15 days</small>
            <button className="btn outline-btn">View Details</button>
          </div>
          <div className="scheme new">
            <div className="scheme-header">
              <div>
                <h4>Crop Insurance Scheme</h4>
                <p>Protect your crops against natural calamities</p>
              </div>
              <span className="tag new">New</span>
            </div>
            <small>Application deadline: 30 days left</small>
            <button className="btn primary-btn">Apply Now</button>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="card analytics-section">
          <div className="analytics-header">
            <div>
              <h3 className="analytics-title">Analytics Dashboard</h3>
              <p className="analytics-subtitle">Track your performance and insights</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="analytics-tabs">

            <TabsContent value="overview" className="analytics-tab-content">
              {renderAnalytics()}
            </TabsContent>
          </Tabs>
        </section>
      </div>
      
      <BottomNavigator 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        userRole="farmer"
      />
    </div>
  );
};

export default FarmerDashboard;