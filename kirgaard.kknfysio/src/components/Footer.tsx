import React from 'react';
import { content } from '../data/content';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <p>{content.footer.copyright}</p>
        <p>
          {content.footer.links.map((link, index) => (
            <button 
              key={index} 
              onClick={() => alert('Cookie politik kommer snart')}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-sand)', 
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: '0 0.5rem',
                font: 'inherit'
              }}
            >
              {link}
            </button>
          ))}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
