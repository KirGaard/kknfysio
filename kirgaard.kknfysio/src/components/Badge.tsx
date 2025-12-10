import React from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  href: string;
  ariaLabel: string;
  icon?: string;
}

const Badge: React.FC<BadgeProps> = ({ href, ariaLabel, icon = '📞' }) => {
  return (
    <a 
      href={href}
      className={styles.badge}
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  );
};

export default Badge;
