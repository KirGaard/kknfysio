import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Card from '../components/Card';
import styles from './Services.module.css';

const Services: React.FC = () => {
  return (
    <Section id="services" className={styles.services}>
      <h2 className={styles.title}>Ydelser</h2>
      <div className={styles.grid}>
        {content.services.map((service) => (
          <Card key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Services;
