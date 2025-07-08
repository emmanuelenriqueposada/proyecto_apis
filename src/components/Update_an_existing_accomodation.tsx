// src/components/Update_an_existing_accommodation.tsx
import React, { useState } from 'react';
import Navbar_1 from './Navbar_1';
import '../assets/Accommodations.css';

const UpdateAccommodation: React.FC = () => {
    const [id, setId] = useState('');
    const [form, setForm] = useState({
        name: '',
        description: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fetching, setFetching] = useState(false);

    const token = localStorage.getItem('authToken');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchAccommodation = () => {
        if (!id.trim()) {
            setMessage('Please enter a valid ID.');
            return;
        }

        setFetching(true);
        setMessage('');

        fetch(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/ ${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                setForm({
                    name: data.name || '',
                    description: data.description || '',
                    address: data.address || '',
                });
                setMessage('Accommodation loaded successfully.');
                setFetching(false);
            })
            .catch((err) => {
                console.error('Error loading accommodation:', err);
                setMessage('Could not load the accommodation.');
                setFetching(false);
            });
    };

    const handleUpdate = () => {
        if (!id.trim()) {
            setMessage('You must enter a valid ID.');
            return;
        }

        setLoading(true);
        setMessage('');

        fetch(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/ ${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then(() => {
                setMessage('Accommodation updated successfully.');
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error updating accommodation:', err);
                setMessage('There was an error updating the accommodation.');
                setLoading(false);
            });
    };

    return (
        <div>
            <Navbar_1 />
            <div className="accommodations-container">
                <h2>Update Accommodation</h2>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Accommodation ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        style={{ padding: '0.5rem', marginRight: '0.5rem', width: '60%' }}
                    />
                    <button onClick={fetchAccommodation} style={{ padding: '0.5rem 1rem' }}>
                        {fetching ? 'Loading...' : 'Load'}
                    </button>
                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
                />
                <button onClick={handleUpdate} style={{ padding: '0.5rem 1rem' }}>
                    {loading ? 'Updating...' : 'Update'}
                </button>

                {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
            </div>
        </div>
    );
};

export default UpdateAccommodation;