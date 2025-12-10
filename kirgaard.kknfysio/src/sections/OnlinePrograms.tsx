import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import styles from './OnlinePrograms.module.css';

const OnlinePrograms: React.FC = () => {
  const { onlinePrograms } = content;

  return (
    <Section id="online" className={styles.onlinePrograms}>
      <div className={styles.content}>
        <h2 className={styles.title}>{onlinePrograms.title}</h2>
        <p className={styles.description}>{onlinePrograms.description}</p>
        <p className={styles.price}>{onlinePrograms.price}</p>
        <div className={styles.programs}>
          {onlinePrograms.programs.map((program, index) => (
            <div key={index} className={styles.program}>
              {program}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default OnlinePrograms;
