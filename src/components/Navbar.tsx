// src/components/Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <span className="navbar-brand">Dashboard</span>
      <div className="navbar-links">
        <Link to="/dashboard">Inicio</Link>
        <Link to="/accommodations">Ver Alojamiento</Link>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
