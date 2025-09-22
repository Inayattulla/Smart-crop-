import React from 'react';

function RoleSelection({ setRole }) {
  return (
    <div className="role-bg">
      <div className="role-header">
        <div className="role-logo" />
        <h2>Smart Crop Advisory System</h2>
        <p>Choose your role to get started</p>
      </div>
      <div className="role-cards">
        <div className="role-card" onClick={() => setRole('farmer')}>
          <div className="icon icon-farmer" />
          <h3>Farmer</h3>
          <p>Get AI-powered crop suggestions, disease detection, and market insights</p>
          <button>Continue as Farmer</button>
        </div>
        <div className="role-card" onClick={() => setRole('officer')}>
          <div className="icon icon-officer" />
          <h3>Agricultural Officer</h3>
          <p>Support farmers with expert guidance and government scheme information</p>
          <button>Continue as Agricultural Officer</button>
        </div>
        <div className="role-card role-card-buyer" onClick={() => setRole('buyer')}>
          <div className="icon icon-buyer" />
          <h3>Buyer</h3>
          <p>Connect with farmers, browse crops, and make purchases directly</p>
          <button>Continue as Buyer</button>
        </div>
      </div>
      <footer className="role-footer">
        <span>🌱 Empowering Agriculture Through Technology</span>
      </footer>
    </div>
  );
}

export default RoleSelection;
