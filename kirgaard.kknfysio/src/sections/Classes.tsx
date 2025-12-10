import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Card from '../components/Card';
import styles from './Classes.module.css';

const Classes: React.FC = () => {
  return (
    <Section id="hold" className={styles.classes}>
      <h2 className={styles.title}>Holdtræning</h2>
      <div className={styles.grid}>
        {content.classes.map((cls, index) => (
          <Card key={index}>
            <h3 className={styles.classTitle}>{cls.title}</h3>
            <p className={styles.schedule}>{cls.schedule}</p>
            <p className={styles.location}>{cls.location}</p>
            <p className={styles.description}>{cls.description}</p>
            {cls.note && <p className={styles.note}>{cls.note}</p>}
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Classes;
