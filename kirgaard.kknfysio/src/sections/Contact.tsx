import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Button from '../components/Button';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const { contact } = content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would be handled here
    alert('Tak for din besked! Jeg vender tilbage hurtigst muligt.');
  };

  return (
    <Section id="kontakt" className={styles.contact}>
      <div className={styles.container}>
        <h2 className={styles.title}>{contact.title}</h2>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3>Kontaktinformation</h3>
            <div className={styles.infoItem}>
              <h4>Adresse</h4>
              <p>{contact.address}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Telefon</h4>
              <p>
                <a href={`tel:${contact.ctaPhone}`}>{contact.phone}</a>
              </p>
              <p className={styles.note}>{contact.phoneNote}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Email</h4>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
            <div className={styles.ctas}>
              <Button variant="primary" href={`mailto:${contact.ctaMail}`}>
                Send email
              </Button>
              <Button variant="secondary" href={`tel:${contact.ctaPhone}`}>
                Ring nu
              </Button>
            </div>
          </div>
          
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">{contact.form.labels.name}</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">{contact.form.labels.email}</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">{contact.form.labels.message}</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <Button type="submit" variant="primary">
              {contact.form.labels.submit}
            </Button>
          </form>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
