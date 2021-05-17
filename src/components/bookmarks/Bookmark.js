import React from 'react';
import styles from './bookmarks.module.css';

const Bookmark = ({ bookmark, currentUser }) => {

  const deleteBookmark = (bookmark) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${bookmark.title}" bookmark??`);
    if(!confirmDelete) {
      return
    }
    console.log('deleted', bookmark.title)
  };

  return (
    <div className={styles.box}>
      <h5><strong>{bookmark.title}</strong></h5>
      <div className={styles.img} >
        <img src={bookmark.image} alt={bookmark.title} />
      </div>
        <div className={styles.description}>
          <p>{bookmark.description}</p>
        </div>
        {currentUser && (currentUser.uid === bookmark.userId) && (
          <button 
            className={styles.buttonX} 
            onClick={() => deleteBookmark(bookmark)}
          >
            X
          </button>
        )
        }
      {/* <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
      <button className={styles.buttonGhostGo} >Go There</button></a> */}
    </div>
  );
};

export default Bookmark;