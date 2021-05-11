import React from 'react';
import styles from './styles.module.css';
import Signup from './authentication/Signup';

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.signup}>
        <Signup />
      </div>
    </div>
  );
}

export default App;
