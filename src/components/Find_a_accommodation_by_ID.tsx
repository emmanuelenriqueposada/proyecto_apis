// src/components/Find_a_accommodation_by_ID.tsx
import React, { useState } from 'react';
import Navbar from './Navbar_1';
import '../assets/Accommodations.css';

interface Accommodation {
  id: number;
  name: string;
  address: string;
  description: string;
}

const FindAccommodationByID: React.FC = () => {
  const [id, setId] = useState('');
  const [accommodation, setAccommodation] = useState<Accommodation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!id.trim()) return;

    setLoading(true);
    setError('');
    setAccommodation(null);

    const token = localStorage.getItem('authToken');

    fetch(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id}`, {
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
        setAccommodation(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al buscar alojamiento:', err);
        setError('No se encontró el alojamiento o hubo un error.');
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="accommodations-container">
        <h2>Search Accommodation by ID</h2>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Enter Accommodation ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ padding: '0.5rem', marginRight: '0.5rem' }}
          />
          <button onClick={handleSearch} style={{ padding: '0.5rem 1rem' }}>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {accommodation && (
          <div className="accommodation-card">
            <p><strong>ID:</strong> {accommodation.id}</p>
            <p><strong>Name:</strong> {accommodation.name || 'Not specified'}</p>
            <p><strong>Address:</strong> {accommodation.address || 'Not specified'}</p>
            <p><strong>Description:</strong> {accommodation.description || 'Not specified'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindAccommodationByID;
