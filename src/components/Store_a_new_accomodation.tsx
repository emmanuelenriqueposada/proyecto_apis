// src/components/Store_a_new_accomodation.tsx
import React, { useState } from 'react';
import Navbar_1 from './Navbar_1';
import '../assets/Accommodations.css';

const StoreNewAccommodation: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const token = localStorage.getItem('authToken');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!form.name || !form.description || !form.address) {
            setMessage('All fields are required.');
            return;
        }

        setLoading(true);
        setMessage('');

        fetch('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation ', {
            method: 'POST',
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
                setMessage('Accommodation created successfully.');
                setForm({ name: '', description: '', address: '' });
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error creating accommodation:', err);
                setMessage('There was an error registering the accommodation.');
                setLoading(false);
            });
    };

    return (
        <div>
            <Navbar_1 />
            <div className="accommodations-container">
                <h2>Register New Accommodation</h2>

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
                <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
                    {loading ? 'Registering...' : 'Register'}
                </button>

                {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
            </div>
        </div>
    );
};

export default StoreNewAccommodation;