import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Booking, Event, BookingStatus } from '../../types/database.types';
import styles from './AdminBookings.module.css';

interface BookingWithDetails extends Booking {
  events?: Event;
  profiles?: { full_name: string | null; email: string };
}

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([]);

  const fetchData = useCallback(async () => {
    try {
      // Fetch all events for filter dropdown
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: false });

      setEvents(eventsData || []);

      // Fetch bookings with event and profile info
      let query = supabase
        .from('bookings')
        .select(`
          *,
          events (*),
          profiles (full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      if (selectedEvent !== 'all') {
        query = query.eq('event_id', selectedEvent);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [filter, selectedEvent]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);

      if (error) {
        alert('Kunne ikke opdatere status: ' + error.message);
      } else {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
        );
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Er du sikker på, at du vil slette denne booking?')) {
      return;
    }

    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);

      if (error) {
        alert('Kunne ikke slette booking: ' + error.message);
      } else {
        setBookings((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('da-DK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Afventer';
      case 'confirmed':
        return 'Bekræftet';
      case 'cancelled':
        return 'Annulleret';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Indlæser bookinger...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <Link to="/admin" className={styles.backLink}>
              ← Tilbage til Dashboard
            </Link>
            <h1 className={styles.title}>Booking Oversigt</h1>
          </div>
        </header>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label htmlFor="statusFilter">Status:</label>
            <select
              id="statusFilter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as BookingStatus | 'all')}
              className={styles.filterSelect}
            >
              <option value="all">Alle</option>
              <option value="pending">Afventer</option>
              <option value="confirmed">Bekræftet</option>
              <option value="cancelled">Annulleret</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="eventFilter">Event:</label>
            <select
              id="eventFilter"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Alle events</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className={styles.noData}>
            <p>Ingen bookinger fundet med de valgte filtre.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Dato</th>
                  <th>Bruger</th>
                  <th>Email</th>
                  <th>Event</th>
                  <th>Status</th>
                  <th>Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{formatDate(booking.created_at)}</td>
                    <td className={styles.nameCell}>
                      {booking.profiles?.full_name || 'Ikke angivet'}
                    </td>
                    <td>{booking.profiles?.email || 'Ukendt'}</td>
                    <td>{booking.events?.title || 'Ukendt event'}</td>
                    <td>
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking.id, e.target.value as BookingStatus)
                        }
                        className={`${styles.statusSelect} ${styles[booking.status]}`}
                      >
                        <option value="pending">Afventer</option>
                        <option value="confirmed">Bekræftet</option>
                        <option value="cancelled">Annulleret</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(booking.id)}
                      >
                        Slet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedEvent !== 'all' && bookings.length > 0 && (
          <div className={styles.summary}>
            <h3>Deltagere for: {events.find((e) => e.id === selectedEvent)?.title}</h3>
            <ul className={styles.attendeeList}>
              {bookings
                .filter((b) => b.status !== 'cancelled')
                .map((booking) => (
                  <li key={booking.id}>
                    <span className={styles.attendeeName}>
                      {booking.profiles?.full_name || 'Ikke angivet'}
                    </span>
                    <span className={styles.attendeeEmail}>
                      {booking.profiles?.email}
                    </span>
                    <span className={`${styles.attendeeStatus} ${styles[booking.status]}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </li>
                ))}
            </ul>
            <p className={styles.totalAttendees}>
              Total: {bookings.filter((b) => b.status !== 'cancelled').length} deltagere
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminBookings;
