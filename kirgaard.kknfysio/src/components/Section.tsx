import React from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
  backgroundColor?: string;
}

const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  centered = false,
  className = '',
  backgroundColor 
}) => {
  return (
    <section 
      id={id} 
      className={`${styles.section} ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className={`${styles.container} ${centered ? styles.centered : ''}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
