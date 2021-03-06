import React from 'react';
import styles from './bookmarks.module.css';
import Bookmark from './Bookmark';
import { useAuth } from '../../contexts/AuthContext';

const Bookmarks = ({items}) => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div>
        <div className={styles.counter}>
          {items ? items.length : ''}
        </div>
      </div>
      <div className={styles.parent}>
        {items
            ? [...items].reverse().map((value) => 
            <Bookmark bookmark={value} key={value.id} currentUser={currentUser} />)
            : ''}
      </div>
    </div>
  );
};

export default Bookmarks;