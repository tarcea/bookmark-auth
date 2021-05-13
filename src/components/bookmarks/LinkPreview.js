import React from 'react';
import styles from './bookmarks.module.css';

const LinkPreview = ({ data }) => {
  return (
    <div className={styles.box}>
      <h5><strong>{data.title}</strong></h5>
      <div className={styles.img}>
        <img src={data.image} alt={data.title} />
      </div>
        <div className={styles.description}>
          <p>{data.description}</p>
        </div>
      {/* <button className="button-x">X</button> */}
      {/* <a href={data.url} target="_blank" rel="noopener noreferrer">
      <button className="button-ghost-go" >Go There</button></a> */}
    </div>
  );
};

export default LinkPreview;