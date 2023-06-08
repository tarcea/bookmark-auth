import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Bookmark from './Bookmark';
import styles from './bookmarks.module.css';

const LinkPreview = (props) => {
  const { data, setUrl, setPreview, createNew, isPublic, setIsPublic } = props;
  const { currentUser } = useAuth();
  const cancelPreview = () => {
    setPreview(false);
    setUrl('');
  };

  const onInputChange = () => {
    setIsPublic(!isPublic);
  };
  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <label>public</label>
      <input
        type='checkbox'
        name='public'
        checked={isPublic}
        onChange={onInputChange}
        style={{ width: '20px' }}
      />
      <button className={styles.buttonGhost} onClick={cancelPreview}>
        cancel
      </button>
      <button className={styles.buttonGhost} onClick={createNew}>
        bookmark
      </button>
      <Bookmark bookmark={data} currentUser={currentUser} />
    </div>
  );
};

export default LinkPreview;
