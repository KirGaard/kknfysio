import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash?: string) => {
    closeMenu();
    
    if (hash) {
      // If we're navigating to an anchor on the same page
      if (location.pathname === path) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          KKN FYSIO
        </Link>
        
        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Luk menu' : 'Åbn menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? '✕' : '☰'}
        </button>

        <div className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
          <Link 
            to="/" 
            className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            onClick={(e) => handleNavClick(e, '/')}
          >
            Forside
          </Link>
          <Link 
            to="/rytteranalyse" 
            className={`${styles.navLink} ${isActive('/rytteranalyse') ? styles.active : ''}`}
            onClick={(e) => handleNavClick(e, '/rytteranalyse')}
          >
            Rytteranalyse & Træning
          </Link>
          <Link 
            to="/hold-online" 
            className={`${styles.navLink} ${isActive('/hold-online') ? styles.active : ''}`}
            onClick={(e) => handleNavClick(e, '/hold-online')}
          >
            Hold & Online
          </Link>
          <Link 
            to="/priser" 
            className={`${styles.navLink} ${isActive('/priser') ? styles.active : ''}`}
            onClick={(e) => handleNavClick(e, '/priser')}
          >
            Priser
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
