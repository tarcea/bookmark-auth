import React, { useRef } from 'react';
import styles from './auth.module.css';

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return (
    <>
      <div className={styles.form}>
        <p>Sign Up</p>
        <form>
          <div id="email">
            <label></label>
            <input type="email" ref={emailRef} required placeholder="Email"/>
          </div>
          <div id="password">
            <label></label>
            <input type="password" ref={passwordRef} required placeholder="Password"/>
          </div>
          <div id="password-confirm">
            <label></label>
            <input type="email" ref={passwordConfirmRef} required placeholder="Confirm Password"/>
          </div>
          <div className={styles.submit}>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
      <div>
        Already have an account? Log In
      </div>
    </>
  );
};

export default Signup;