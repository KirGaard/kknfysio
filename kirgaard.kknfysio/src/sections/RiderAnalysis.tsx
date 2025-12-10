import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Button from '../components/Button';
import styles from './RiderAnalysis.module.css';

const RiderAnalysis: React.FC = () => {
  const { riderAnalysis } = content;

  return (
    <Section id="rytteranalyse" className={styles.riderAnalysis}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{riderAnalysis.title}</h2>
          <p className={styles.description}>{riderAnalysis.description}</p>
          <ul className={styles.features}>
            {riderAnalysis.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p className={styles.price}>{riderAnalysis.price}</p>
          <Button variant="primary" href={`mailto:${content.contact.email}`}>
            Kontakt for booking
          </Button>
        </div>
        {riderAnalysis.imagePlaceholder && (
          <div className={styles.imagePlaceholder}>
            Rytteranalyse billede
          </div>
        )}
      </div>
    </Section>
  );
};

export default RiderAnalysis;
