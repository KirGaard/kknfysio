import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  href,
  type = 'button',
  ariaLabel 
}) => {
  const className = `${styles.button} ${styles[variant]}`;
  
  if (href) {
    return (
      <a 
        href={href} 
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button 
      className={className} 
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
