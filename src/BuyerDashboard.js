import React from 'react';
import { useNavigate } from 'react-router-dom';

const orders = [
  { crop: 'Basmati Rice', id: 'ORD001', qty: '10 quintals', price: '₹23,500', status: 'confirmed' },
  { crop: 'Organic Wheat', id: 'ORD002', qty: '5 quintals', price: '₹14,000', status: 'in transit' },
  { crop: 'Cotton', id: 'ORD003', qty: '3 quintals', price: '₹15,600', status: 'pending' },
  // Add more orders if needed
];

const trends = [
  { name: 'Rice Prices Rising', desc: '+8% this week', tag: 'Buy Now', type: 'good' },
  { name: 'Wheat Stable', desc: 'No change', tag: 'Monitor', type: 'neutral' },
  { name: 'Cotton Peak Season', desc: 'High demand', tag: 'Hot', type: 'alert' },
];

function BuyerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <h2>Buyer Dashboard</h2>
        <span>Welcome,</span>
      </div>
      <div className="dashboard-summary">
        <div className="summary-card">
          <span role="img" aria-label="cart">🛒</span>
          <div>3</div>
          <label>Active Orders</label>
        </div>
        <div className="summary-card">
          <span role="img" aria-label="crops">📦</span>
          <div>6</div>
          <label>Available Crops</label>
        </div>
      </div>
      <div className="dashboard-orders">
        <h3>Recent Orders</h3>
        <ul>
          {orders.slice(0, 3).map(order => (
            <li key={order.id} className={`order-${order.status.replace(' ', '-')}`}>
              <div>
                <strong>{order.crop}</strong> <span>Order #{order.id}</span>
                <span>{order.qty}</span>
              </div>
              <div>
                <span className={`order-status ${order.status}`}>{order.status}</span>
                <span>{order.price}</span>
              </div>
            </li>
          ))}
        </ul>
        <button className="orders-btn" onClick={() => navigate('/buyer/orders')}>
          View All Orders
        </button>
      </div>
      <div className="dashboard-trends">
        <h3>Market Trends</h3>
        <ul>
          {trends.map((trend, idx) => (
            <li key={idx} className={`trend-${trend.type}`}>
              <div>
                <strong>{trend.name}</strong>
                <span>{trend.desc}</span>
              </div>
              <span className={`trend-tag ${trend.type}`}>{trend.tag}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="dashboard-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <button>Browse Crops</button>
          <button>Contact Farmers</button>
          <button>Track Orders</button>
          <button>Market Analysis</button>
        </div>
        <button className="gov-btn">Government Schemes</button>
      </div>
      <footer className="dashboard-footer">
        <nav>
          <button>Browse Crops</button>
          <button>Orders</button>
          <button>Profile</button>
        </nav>
      </footer>
    </div>
  );
}

export default BuyerDashboard;
