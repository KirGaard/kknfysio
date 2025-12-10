import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import ServiceCard from '../components/ServiceCard';
import styles from './Services.module.css';

const serviceIcons: Record<string, string> = {
  ryttertraening: '🏇',
  fysioterapi: '💆',
  genoptraening: '🔄',
  screening: '📋',
  holdtraening: '👥',
  online: '💻',
};

const Services: React.FC = () => {
  return (
    <Section id="services" className={styles.services}>
      <h2 className={styles.title}>Ydelser</h2>
      <p className={styles.subtitle}>Professionel fysioterapi og ryttertræning tilpasset dine individuelle behov og mål</p>
      <div className={styles.grid}>
        {content.services.map((service) => (
          <ServiceCard
            key={service.id}
            icon={<span>{serviceIcons[service.id] || '✦'}</span>}
            title={service.title}
            description={service.description}
            buttonText="Se mulighederne"
          />
        ))}
      </div>
    </Section>
  );
};

export default Services;
