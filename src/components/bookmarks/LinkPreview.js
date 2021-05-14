import React from 'react';
import styles from './bookmarks.module.css';

const LinkPreview = (props) => {
  const { data, setUrl, setPreview, createBookmark } =props;
  const cancelPreview = () => {
    setPreview(false);
    setUrl('');
  };
  return (
    <div>
      <div>
        <button 
          className={styles.buttonGhost} 
          onClick={cancelPreview}
        >
          cancel
        </button>
        <button 
          className={styles.buttonGhost}  
          onClick={createBookmark}
        >
          bookmark
        </button>
      </div>
      <p>Domain: { data.url }</p>
      <p>Title: { data.title }</p>
      <p>Description: { data.description }</p>
      <img height="100px" width="100px" src={data.image} alt={data.title} />
      </div>
  );
};

export default LinkPreview;