// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/Dashboard.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || 'Usuario desconocido';
  const token = localStorage.getItem('authToken') || '';

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <div className="dashboard-background">
      <nav className="navbar">
        <span className="navbar-brand">Home Page</span>
        <div className="navbar-links">
          <Link to="/accommodations">Accomodations</Link>
          <Link to="/bookings">Bookings</Link>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      </nav>

      <div className="dashboard-card">
        <h1 className="dashboard-title">Welcome, {userEmail}</h1>
        <p className="dashboard-subtitle">Your token:</p>
        <textarea
          value={token}
          readOnly
          rows={5}
          className="dashboard-token"
        />
      </div>
    </div>
  );
};

export default Dashboard;
