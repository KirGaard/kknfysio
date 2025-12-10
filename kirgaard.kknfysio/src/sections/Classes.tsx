import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import ClassCard from '../components/ClassCard';
import styles from './Classes.module.css';

const Classes: React.FC = () => {
  return (
    <Section id="hold" className={styles.classes}>
      <h2 className={styles.title}>Holdtræning</h2>
      <div className={styles.grid}>
        {content.classes.map((cls, index) => (
          <ClassCard
            key={index}
            title={cls.title}
            category={cls.location}
            description={`${cls.schedule}. ${cls.description}${cls.note ? ` ${cls.note}` : ''}`}
            imagePlaceholder
            buttonText="Book nu"
          />
        ))}
      </div>
    </Section>
  );
};

export default Classes;
