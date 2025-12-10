import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import Button from '../components/Button';
import styles from './About.module.css';

const keyPoints = [
  'Uddannet fysioterapeut med erfaring i ryttertræning',
  'Personlig og helhedsorienteret tilgang',
  'Fokus på bevægelse og funktionel træning',
  'Skræddersyede programmer til dine mål',
];

const About: React.FC = () => {
  const { about, contact } = content;

  return (
    <Section id="om" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{about.title}</h2>
          <p className={styles.lead}>{about.lead}</p>
          <p className={styles.bio}>{about.bio}</p>
          
          <ul className={styles.keyPoints}>
            {keyPoints.map((point, index) => (
              <li key={index} className={styles.keyPoint}>
                <span className={styles.checkIcon}>✓</span>
                {point}
              </li>
            ))}
          </ul>

          <div className={styles.buttons}>
            <Button variant="primary" href={`mailto:${contact.ctaMail}`}>
              Kontakt mig
            </Button>
            <Button variant="secondary" href="#services">
              Læs mere
            </Button>
          </div>
        </div>
        {about.imagePlaceholder && (
          <div className={styles.imagePlaceholder}>
            <span className={styles.imageIcon}>👩‍⚕️</span>
          </div>
        )}
      </div>
    </Section>
  );
};

export default About;
