import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Card from '../components/Card';
import styles from './RiderFocus.module.css';

const RiderFocus: React.FC = () => {
  const { riderFocus } = content;

  return (
    <Section id="rytterfokus" className={styles.riderFocus}>
      <h2 className={styles.title}>{riderFocus.title}</h2>
      <div className={styles.grid}>
        {riderFocus.areas.map((area, index) => (
          <Card key={index}>
            <div className={styles.area}>
              <h3 className={styles.areaTitle}>{area.title}</h3>
              <p className={styles.areaDescription}>{area.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default RiderFocus;
