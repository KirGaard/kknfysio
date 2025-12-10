import React from 'react';
import { content } from '../data/content';
import Section from '../components/Section';
import styles from './Testimonials.module.css';

const Testimonials: React.FC = () => {
  return (
    <Section id="testimonials" className={styles.testimonials}>
      <h2 className={styles.title}>Anmeldelser</h2>
      <div className={styles.grid}>
        {content.testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <p className={styles.quote}>{testimonial.quote}</p>
            <p className={styles.author}>– {testimonial.author}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials;
