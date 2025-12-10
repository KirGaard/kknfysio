import React from 'react';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  buttonText = 'Se mulighederne',
  buttonHref,
  onButtonClick,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {icon || <span className={styles.defaultIcon}>✦</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {buttonHref ? (
        <a href={buttonHref} className={styles.button}>
          {buttonText}
        </a>
      ) : (
        <button className={styles.button} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ServiceCard;
