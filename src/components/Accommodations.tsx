// src/components/Accommodations.tsx
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import '../assets/Accommodations.css';

interface Accommodation {
  id: string;
  name: string;
  location: string;
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
        // Ajusta esta línea según la estructura real de la respuesta
        setAccommodations(Array.isArray(data) ? data : data.data || []);
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
        <h2>Lista de Todos los Alojamiento</h2>
        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : Array.isArray(accommodations) && accommodations.length > 0 ? (
          <ul className="accommodations-list">
            {accommodations.map((acc) => (
              <li key={acc.id} className="accommodation-card">
                <h3>{acc.name}</h3>
                <p><strong>Ubicación:</strong> {acc.location}</p>
                <p>{acc.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron alojamientos.</p>
        )}
      </div>
    </div>
  );
};

export default Accommodations;
