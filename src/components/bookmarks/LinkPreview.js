import React, { useState } from 'react';
import styles from './bookmarks.module.css';

const LinkPreview = (props) => {
  const { data, setUrl, setPreview, createNew, isPublic, setIsPublic } =props;

  const cancelPreview = () => {
    setPreview(false);
    setUrl('');
  };

  const onInputChange = () => {
    setIsPublic(!isPublic)
  };

  return (
    <div className={styles.preview}>
      <div>
      <label>public</label>
      <input type="checkbox" name="public" checked={isPublic} onChange={onInputChange}/>
        <button 
          className={styles.buttonGhost} 
          onClick={cancelPreview}
        >
          cancel
        </button>
        <button 
          className={styles.buttonGhost}  
          onClick={createNew}
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