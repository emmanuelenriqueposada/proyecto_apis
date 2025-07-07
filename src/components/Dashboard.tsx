// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="dashboard-card">
        <h1 className="dashboard-title">Bienvenido, {userEmail} </h1>
        <p className="dashboard-subtitle">Tu token es:</p>
        <textarea
          value={token}
          readOnly
          rows={5}
          className="dashboard-token"
        />
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
