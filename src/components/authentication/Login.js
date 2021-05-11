import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './auth.module.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/dashboard');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.signup}>
          <div className={styles.form}>
            <p>Log In</p>
            {error && <div className={styles.alert}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div id="email">
                <label></label>
                <input type="email" ref={emailRef} required placeholder="Email"/>
              </div>
              <div id="password">
                <label></label>
                <input type="password" ref={passwordRef} required placeholder="Password"/>
              </div>
              <div className={styles.submit}>
                <button disabled={loading} type="submit">Log In</button>
              </div>
            </form>
            <div style={{textAlign: "center"}}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>
          <div>
            Do not have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;