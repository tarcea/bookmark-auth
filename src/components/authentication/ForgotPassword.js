import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './auth.module.css';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password');
    }
    setLoading(false);
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.signup}>
          <div className={styles.form}>
            <p>Password Reset</p>
            {error && <div className={styles.alert}>{error}</div>}
            {message && <div className={styles.success}>{message}</div>}
            <form onSubmit={handleSubmit}>
              <div id="email">
                <label></label>
                <input type="email" ref={emailRef} required placeholder="Email"/>
              </div>
              <div className={styles.submit}>
                <button disabled={loading} type="submit">Reset Password</button>
              </div>
            </form>
            <div style={{textAlign: "center"}}>
              <Link to="/login">Login</Link>
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

export default ForgotPassword;