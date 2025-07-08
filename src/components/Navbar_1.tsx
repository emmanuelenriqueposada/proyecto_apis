// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar_1.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Posada - API</span>
      <div className="navbar-links">
        <Link to="/dashboard">Home Page</Link>
        <Link to="/accommodations">Get all</Link>
        <Link to="/find-accommodation">Get By ID</Link>
        <Link to="/update-accommodation">Update an existing</Link>
        <Link to="/store-accommodation">Store a new </Link>
        <button onClick={handleLogout}>Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
