import React, { useState } from 'react';

const allOrders = [
  {
    crop: 'Basmati Rice',
    id: 'ORD001',
    farmer: 'Raj Kumar',
    qty: '10 quintals',
    price: '₹23,500',
    status: 'confirmed',
    orderDate: '12/8/2024',
    delivery: '12/12/2024',
    tab: 'active'
  },
  {
    crop: 'Organic Wheat',
    id: 'ORD002',
    farmer: 'Priya Singh',
    qty: '5 quintals',
    price: '₹14,000',
    status: 'in transit',
    orderDate: '12/6/2024',
    delivery: '12/10/2024',
    tab: 'active'
  },
  {
    crop: 'Cotton',
    id: 'ORD003',
    farmer: 'Amit Patel',
    qty: '3 quintals',
    price: '₹15,600',
    status: 'pending',
    orderDate: '12/9/2024',
    delivery: '',
    tab: 'active'
  },
  {
    crop: 'Maize',
    id: 'ORD004',
    farmer: 'Sunil Verma',
    qty: '1 quintal',
    price: '₹2,800',
    status: 'completed',
    orderDate: '11/22/2024',
    delivery: '11/26/2024',
    tab: 'completed'
  },
  {
    crop: 'Chana',
    id: 'ORD005',
    farmer: 'Mira Shah',
    qty: '2 quintals',
    price: '₹5,400',
    status: 'cancelled',
    orderDate: '11/18/2024',
    delivery: '',
    tab: 'cancelled'
  }
  // Add more sample orders as needed
];

function BuyerOrders({ onBack }) {
  const [tab, setTab] = useState('active');

  const filteredOrders = allOrders.filter(order => order.tab === tab);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-header">
        <h2>My Orders</h2>
        <span>Welcome,</span>
      </div>
      <div className="orders-container">
        <button className="orders-back-btn" onClick={onBack}>← Back to Dashboard</button>
        <div className="orders-tabs">
          <button className={tab === 'active' ? 'tab-active' : ''} onClick={() => setTab('active')}>Active</button>
          <button className={tab === 'completed' ? 'tab-active' : ''} onClick={() => setTab('completed')}>Completed</button>
          <button className={tab === 'cancelled' ? 'tab-active' : ''} onClick={() => setTab('cancelled')}>Cancelled</button>
        </div>
        <div className="orders-list">
          {filteredOrders.length === 0 && <div>No orders in this section.</div>}
          {filteredOrders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="order-left">
                <h4>{order.crop}</h4>
                <div>Order <strong>#{order.id}</strong></div>
                <div>Farmer: {order.farmer}</div>
                <div>Quantity: {order.qty}</div>
                <div>Total Amount: {order.price}</div>
                <div>Order Date: {order.orderDate}</div>
                <div>Expected Delivery: {order.delivery ? order.delivery : <span style={{ color: '#888' }}>—</span>}</div>
                <div className="order-actions">
                  <button>📞 Call Farmer</button>
                  {order.tab === 'active' && <button>🚚 Track</button>}
                  {order.tab === 'cancelled' && <button style={{ color: 'red', background: 'none', border: 'none' }}>Cancel</button>}
                </div>
              </div>
              <div className="order-right">
                <span className={`order-status ${order.status}`}>{order.status.replace('_', ' ')}</span>
                <div>{order.farmer}</div>
                <div>{order.qty}</div>
                <div>{order.price}</div>
                <div>{order.orderDate}</div>
                {order.delivery && <div>{order.delivery}</div>}
              </div>
            </div>
          ))}
        </div>
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

export default BuyerOrders;
