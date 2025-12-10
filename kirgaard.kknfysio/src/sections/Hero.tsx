import React from 'react';
import { content } from '../data/content';
import Button from '../components/Button';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const { hero } = content;

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
          <div className={styles.ctas}>
            <Button 
              variant="primary" 
              href={`mailto:${hero.ctas.mailto}`}
              ariaLabel="Send email til KKN Fysio"
            >
              Kontakt mig
            </Button>
            <Button 
              variant="secondary" 
              href={`tel:${hero.ctas.tel}`}
              ariaLabel="Ring til KKN Fysio"
            >
              Ring {hero.ctas.tel}
            </Button>
          </div>
        </div>
        {hero.imagePlaceholder && (
          <div className={styles.imagePlaceholder}>
            Hero billede
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
