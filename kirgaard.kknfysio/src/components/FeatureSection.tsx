import React from 'react';
import styles from './FeatureSection.module.css';

interface FeatureSectionProps {
  tag?: string;
  title: string;
  description: string;
  imageUrl?: string;
  imagePlaceholder?: boolean;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  reversed?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  tag,
  title,
  description,
  imageUrl,
  imagePlaceholder = false,
  buttonText = 'Læs mere',
  buttonHref,
  onButtonClick,
  reversed = false,
}) => {
  return (
    <div className={`${styles.container} ${reversed ? styles.reversed : ''}`}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={styles.image} />
        ) : imagePlaceholder ? (
          <div className={styles.imagePlaceholder}>
            <span>📷</span>
          </div>
        ) : null}
      </div>
      <div className={styles.content}>
        {tag && <span className={styles.tag}>{tag}</span>}
        <h2 className={styles.title}>{title}</h2>
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

export default FeatureSection;
