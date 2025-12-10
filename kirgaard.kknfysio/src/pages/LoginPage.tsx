import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          setError(error.message);
        } else {
          setMessage('Tjek din email for at bekræfte din konto.');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError('Der opstod en uventet fejl. Prøv igen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>
            {isSignUp ? 'Opret konto' : 'Log ind'}
          </h1>
          
          <p className={styles.subtitle}>
            {isSignUp 
              ? 'Opret en konto for at booke hold og kurser.' 
              : 'Log ind for at se dine bookinger og mere.'}
          </p>

          {error && (
            <div className={styles.error} role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className={styles.message} role="status">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            {isSignUp && (
              <div className={styles.field}>
                <label htmlFor="fullName" className={styles.label}>
                  Fulde navn
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={styles.input}
                  placeholder="Dit fulde navn"
                />
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                placeholder="din@email.dk"
                required
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.label}>
                Adgangskode
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading 
                ? 'Indlæser...' 
                : isSignUp 
                  ? 'Opret konto' 
                  : 'Log ind'}
            </button>
          </form>

          <div className={styles.toggle}>
            <p>
              {isSignUp ? 'Har du allerede en konto?' : 'Har du ikke en konto?'}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className={styles.toggleButton}
            >
              {isSignUp ? 'Log ind' : 'Opret konto'}
            </button>
          </div>

          <Link to="/" className={styles.backLink}>
            ← Tilbage til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
