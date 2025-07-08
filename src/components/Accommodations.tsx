// src/components/Accommodations.tsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar_1';
import '../assets/Accommodations.css';

interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
}

const Accommodations: React.FC = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    fetch('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Respuesta de la API:', data);
        // Ajusta según la estructura real
        const accommodationsList = Array.isArray(data) ? data : data.data || [];
        setAccommodations(accommodationsList);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener alojamientos:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="accommodations-container">
        <h2>List of All Accommodations</h2>
        {loading ? (
          <p>Loading accommodations...</p>
        ) : Array.isArray(accommodations) && accommodations.length > 0 ? (
          <ul className="accommodations-list">
            {accommodations.map((acc) => (
              <li key={acc.id} className="accommodation-card">
                <p><strong>ID:</strong> {acc.id}</p>
                <p><strong>Name:</strong> {acc.name || 'Not specified'}</p>
                <p><strong>Address:</strong> {acc.address || 'Not specified'}</p>
                <p><strong>Description:</strong> {acc.description || 'Not specified'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No accommodations found.</p>
        )}
      </div>
    </div>
  );
};

export default Accommodations;
