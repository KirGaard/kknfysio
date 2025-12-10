import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import styles from './About.module.css';

const About: React.FC = () => {
  const { about } = content;

  return (
    <Section id="om" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{about.title}</h2>
          <p className={styles.lead}>{about.lead}</p>
          <p className={styles.bio}>{about.bio}</p>
        </div>
        {about.imagePlaceholder && (
          <div className={styles.imagePlaceholder}>
            Katja billede
          </div>
        )}
      </div>
    </Section>
  );
};

export default About;
