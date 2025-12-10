import React from 'react';
import styles from './ClassCard.module.css';

interface ClassCardProps {
  title: string;
  category?: string;
  description: string;
  imageUrl?: string;
  imagePlaceholder?: boolean;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  category,
  description,
  imageUrl,
  imagePlaceholder = false,
  buttonText = 'Læs mere',
  buttonHref,
  onButtonClick,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} />
        ) : imagePlaceholder ? (
          <div className={styles.imagePlaceholder}>
            <span>📷</span>
          </div>
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>🏃</span>
          </div>
        )}
      </div>
      <div className={styles.content}>
        {category && <span className={styles.category}>{category}</span>}
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
    </div>
  );
};

export default ClassCard;
