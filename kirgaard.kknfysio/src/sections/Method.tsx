import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Card from '../components/Card';
import styles from './Method.module.css';

const Method: React.FC = () => {
  const { method } = content;

  return (
    <Section id="metode" className={styles.method}>
      <h2 className={styles.title}>{method.title}</h2>
      <div className={styles.steps}>
        {method.steps.map((step, index) => (
          <Card key={index}>
            <div className={styles.step}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Method;
