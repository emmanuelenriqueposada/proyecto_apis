// src/components/Navbar_2.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar_1.css';

const Navbar_2: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Bookings</span>
      <div className="navbar-links">
        <Link to="/dashboard">Home Page</Link>
        <Link to="/bookings">View Bookings</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar_2;
