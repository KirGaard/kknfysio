import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Event, EventType } from '../../types/database.types';
import styles from './AdminEvents.module.css';

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'hold' as EventType,
    start_time: '',
    end_time: '',
    location: '',
    max_spots: '',
    price: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'hold',
      start_time: '',
      end_time: '',
      location: '',
      max_spots: '',
      price: '',
    });
    setEditingEvent(null);
    setFormError(null);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      type: event.type,
      start_time: event.start_time.slice(0, 16),
      end_time: event.end_time.slice(0, 16),
      location: event.location || '',
      max_spots: event.max_spots?.toString() || '',
      price: event.price?.toString() || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Er du sikker på, at du vil slette dette event?')) {
      return;
    }

    try {
      const { error } = await supabase.from('events').delete().eq('id', id);

      if (error) {
        alert('Kunne ikke slette event: ' + error.message);
      } else {
        setEvents((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);

    const eventData = {
      title: formData.title,
      description: formData.description || null,
      type: formData.type,
      start_time: new Date(formData.start_time).toISOString(),
      end_time: new Date(formData.end_time).toISOString(),
      location: formData.location || null,
      max_spots: formData.max_spots ? parseInt(formData.max_spots) : null,
      price: formData.price ? parseFloat(formData.price) : null,
    };

    try {
      if (editingEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);

        if (error) {
          setFormError(error.message);
        } else {
          setShowForm(false);
          resetForm();
          fetchEvents();
        }
      } else {
        const { error } = await supabase.from('events').insert([eventData]);

        if (error) {
          setFormError(error.message);
        } else {
          setShowForm(false);
          resetForm();
          fetchEvents();
        }
      }
    } catch (error) {
      setFormError('Der opstod en uventet fejl.');
    } finally {
      setFormLoading(false);
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'hold':
        return 'Hold';
      case 'online':
        return 'Online';
      case 'workshop':
        return 'Workshop';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.loading}>Indlæser events...</p>
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
            <h1 className={styles.title}>Administrer Events</h1>
          </div>
          <button
            className={styles.addButton}
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
          >
            + Opret Event
          </button>
        </header>

        {showForm && (
          <div className={styles.formOverlay}>
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>
                {editingEvent ? 'Rediger Event' : 'Opret Nyt Event'}
              </h2>

              {formError && <div className={styles.error}>{formError}</div>}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.field}>
                    <label htmlFor="title">Titel *</label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="type">Type *</label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="hold">Hold</option>
                      <option value="online">Online</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="start_time">Start tidspunkt *</label>
                    <input
                      id="start_time"
                      name="start_time"
                      type="datetime-local"
                      value={formData.start_time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="end_time">Slut tidspunkt *</label>
                    <input
                      id="end_time"
                      name="end_time"
                      type="datetime-local"
                      value={formData.end_time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="location">Lokation</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="max_spots">Max pladser</label>
                    <input
                      id="max_spots"
                      name="max_spots"
                      type="number"
                      min="1"
                      value={formData.max_spots}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="price">Pris (kr.)</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="description">Beskrivelse</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                  >
                    Annuller
                  </button>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={formLoading}
                  >
                    {formLoading
                      ? 'Gemmer...'
                      : editingEvent
                      ? 'Gem ændringer'
                      : 'Opret Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {events.length === 0 ? (
          <div className={styles.noData}>
            <p>Ingen events oprettet endnu.</p>
            <button
              className={styles.addButton}
              onClick={() => setShowForm(true)}
            >
              Opret dit første event
            </button>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Titel</th>
                  <th>Type</th>
                  <th>Start</th>
                  <th>Lokation</th>
                  <th>Pladser</th>
                  <th>Pris</th>
                  <th>Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className={styles.titleCell}>{event.title}</td>
                    <td>
                      <span className={`${styles.typeBadge} ${styles[event.type]}`}>
                        {getTypeLabel(event.type)}
                      </span>
                    </td>
                    <td>{formatDate(event.start_time)}</td>
                    <td>{event.location || '-'}</td>
                    <td>{event.max_spots || '-'}</td>
                    <td>{event.price ? `${event.price} kr.` : '-'}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(event)}
                        >
                          Rediger
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDelete(event.id)}
                        >
                          Slet
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminEvents;
