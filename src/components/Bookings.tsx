import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg } from '@fullcalendar/interaction';
import Navbar_2 from './Navbar_2';
import '../assets/FullCalendar.css';

interface Booking {
    id: number;
    user: string;
    accomodation: string;
    check_in_date: string;
    check_out_date: string;
    total_amount: number;
    status: string;
}

interface CalendarEvent {
    id: string;
    title: string;
    start: string;
    end: string;
}

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        fetch('https://apibookingsaccomodations-production.up.railway.app/api/V1/bookings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                const bookingsData: Booking[] = Array.isArray(data) ? data : data.data || [];
                setBookings(bookingsData);

                const calendarEvents: CalendarEvent[] = bookingsData.map((booking) => ({
                    id: booking.id.toString(),
                    title: `${booking.user} - ${booking.accomodation}`,
                    start: booking.check_in_date,
                    end: booking.check_out_date,
                }));

                setEvents(calendarEvents);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching bookings:', err);
                setLoading(false);
            });
    }, []);

    const handleDateClick = (arg: DateClickArg) => {
        setSelectedDate(arg.dateStr);
    };

    const filteredBookings = selectedDate
        ? bookings.filter((b) => {
            const checkIn = new Date(b.check_in_date).toDateString();
            const checkOut = new Date(b.check_out_date).toDateString();
            const selected = new Date(selectedDate).toDateString();
            return selected >= checkIn && selected <= checkOut;
        })
        : [];

    return (
        <div>
            <Navbar_2 />
            <div className="accommodations-container">
                <h2>Reservation Calendar</h2>
                {loading ? (
                    <p>Loading bookings...</p>
                ) : (
                    <>
                        <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            dateClick={handleDateClick}
                            height="auto"
                        />

                        {selectedDate && (
                            <div style={{ marginTop: '2rem' }}>
                                <h3 style={{ color: '#000' }}>
                                    Bookings on {new Date(selectedDate).toDateString()}
                                </h3>
                                {filteredBookings.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {filteredBookings.map((b) => (
                                            <li
                                                key={b.id}
                                                style={{
                                                    background: '#fff',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '8px',
                                                    padding: '1rem',
                                                    marginBottom: '1rem',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                    color: '#000', 
                                                }}
                                            >
                                                <strong>Guest:</strong> {b.user} <br />
                                                <strong>Accommodation:</strong> {b.accomodation} <br />
                                                <strong>Check-in:</strong>{' '}
                                                {new Date(b.check_in_date).toLocaleDateString('en-GB')} <br />
                                                <strong>Check-out:</strong>{' '}
                                                {new Date(b.check_out_date).toLocaleDateString('en-GB')} <br />
                                                <strong>Total:</strong> ${b.total_amount} <br />
                                                <strong>Status:</strong>{' '}
                                                <span
                                                    style={{
                                                        color: '#000', 
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {b.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: '#000' }}>No bookings on this date.</p>
                                )}
                            </div>
                        )}

                    </>
                )}
            </div>
        </div>
    );
};

export default Bookings;
