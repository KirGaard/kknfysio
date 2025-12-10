import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Booking, Event } from '../../types/database.types';
import styles from './AdminDashboard.module.css';

interface BookingWithEvent extends Booking {
  events?: Event;
  profiles?: { full_name: string | null; email: string };
}

const AdminDashboard: React.FC = () => {
  const [recentBookings, setRecentBookings] = useState<BookingWithEvent[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [eventCount, setEventCount] = useState<number>(0);
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent bookings with event and profile info
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select(`
            *,
            events (*),
            profiles (full_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
        } else {
          setRecentBookings(bookings || []);
        }

        // Count total bookings
        const { count: totalBookings } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true });
        setBookingCount(totalBookings || 0);

        // Fetch all events for count and revenue calculation
        const { data: events, count: totalEvents } = await supabase
          .from('events')
          .select('*', { count: 'exact' });

        setEventCount(totalEvents || 0);

        // Calculate estimated revenue from confirmed bookings
        const { data: confirmedBookings } = await supabase
          .from('bookings')
          .select('event_id')
          .eq('status', 'confirmed');

        if (confirmedBookings && events) {
          let revenue = 0;
          confirmedBookings.forEach((booking) => {
            const event = events.find((e) => e.id === booking.event_id);
            if (event?.price) {
              revenue += Number(event.price);
            }
          });
          setTotalRevenue(revenue);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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
      <main className={styles.dashboard}>
        <div className={styles.container}>
          <p className={styles.loading}>Indlæser dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.dashboard}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Admin Dashboard</h1>
          <p className={styles.subtitle}>Administrer hold, events og bookinger</p>
        </header>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📅</span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{eventCount}</span>
              <span className={styles.statLabel}>Events</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📋</span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{bookingCount}</span>
              <span className={styles.statLabel}>Bookinger</span>
            </div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>💰</span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{totalRevenue.toLocaleString('da-DK')} kr.</span>
              <span className={styles.statLabel}>Estimeret omsætning</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/admin/events" className={styles.actionButton}>
            Administrer Events
          </Link>
          <Link to="/admin/bookings" className={styles.actionButton}>
            Se alle Bookinger
          </Link>
        </div>

        <section className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Seneste Bookinger</h2>
          
          {recentBookings.length === 0 ? (
            <p className={styles.noData}>Ingen bookinger endnu.</p>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Dato</th>
                    <th>Bruger</th>
                    <th>Event</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{formatDate(booking.created_at)}</td>
                      <td>
                        {booking.profiles?.full_name || booking.profiles?.email || 'Ukendt'}
                      </td>
                      <td>{booking.events?.title || 'Ukendt event'}</td>
                      <td>
                        <span className={`${styles.status} ${styles[booking.status]}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminDashboard;
