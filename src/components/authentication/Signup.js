import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThirdParty from './ThirdParty';
import styles from './auth.module.css';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(true);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      if (!mountedRef.current) return null;
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/home');
    } catch {
      setError('Failed to create an account');
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
            <p>Sign Up</p>
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
              <div id='password-confirm'>
                <label></label>
                <input
                  type='password'
                  ref={passwordConfirmRef}
                  required
                  placeholder='Confirm Password'
                />
              </div>
              <div className={styles.submit}>
                <button disabled={loading} type='submit'>
                  Sign Up
                </button>
              </div>
            </form>
            <ThirdParty setError={setError} />
          </div>
          <div>
            Already have an account? <Link to='/login'>Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
