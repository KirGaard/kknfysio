import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Card from '../components/Card';
import styles from './TrainingPackages.module.css';

const TrainingPackages: React.FC = () => {
  const { trainingPackages } = content;

  return (
    <Section id="forløb" className={styles.trainingPackages}>
      <h2 className={styles.title}>Træningsforløb</h2>
      <p className={styles.intro}>{trainingPackages.intro}</p>
      <div className={styles.grid}>
        {trainingPackages.items.map((pkg, index) => (
          <Card key={index}>
            <div className={styles.package}>
              <h3 className={styles.packageTitle}>{pkg.title}</h3>
              <p className={styles.frequency}>{pkg.frequency}</p>
              <p className={styles.price}>{pkg.price}</p>
              <p className={styles.description}>{pkg.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default TrainingPackages;
