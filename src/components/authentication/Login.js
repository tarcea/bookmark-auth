import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThirdParty from './ThirdParty';
import styles from './auth.module.css';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      if (!mountedRef.current) return null;
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/home');
    } catch {
      setError('Failed to sign in');
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.signup}>
          <div className={styles.form}>
            <p>Log In</p>
            {error && <div className={styles.alert}>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div id='email'>
                <label></label>
                <input
                  type='email'
                  ref={emailRef}
                  required
                  placeholder='Email'
                />
              </div>
              <div id='password'>
                <label></label>
                <input
                  type='password'
                  ref={passwordRef}
                  required
                  placeholder='Password'
                />
              </div>
              <div className={styles.submit}>
                <button disabled={loading} type='submit'>
                  Log In
                </button>
              </div>
            </form>
            <ThirdParty setError={setError} />
            <div style={{ textAlign: 'center', paddingTop: '1em' }}>
              <Link to='/forgot-password'>Forgot Password?</Link>
            </div>
          </div>
          <div>
            Do not have an account? <Link to='/signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
