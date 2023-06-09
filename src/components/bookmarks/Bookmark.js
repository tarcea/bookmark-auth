import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { db } from '../../firebase';
import styles from './bookmarks.module.css';
const placeholder = 'https://picsum.photos/300/200?grayscale&random';

const Bookmark = ({ bookmark, currentUser }) => {
  const deleteBookmark = (e) => {
    e.stopPropagation();
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${bookmark.title}" bookmark??`
    );
    if (!confirmDelete) {
      return;
    }
    db.collection('bookmarks')
      .doc(bookmark.id)
      .delete();
  };

  const editBookmark = (e) => {
    e.stopPropagation();
    console.log(`please edit '${bookmark.title}'`);
  };

  return (
    <div
      className={styles.box}
      onClick={() => window.open(bookmark.url, '_blank')}
    >
      <h5>
        <strong>{bookmark.title}</strong>
      </h5>
      <div className={styles.img}>
        <img src={bookmark.image || placeholder} alt={bookmark.title} />
      </div>
      <div className={styles.description}>
        <p>{bookmark.description}</p>
      </div>
      {currentUser && currentUser.uid === bookmark.userId && (
        <>
          <TiDelete className={styles.buttonX} onClick={deleteBookmark} />

          <AiTwotoneEdit className={styles.buttonEdit} onClick={editBookmark} />
        </>
      )}
    </div>
  );
};

export default Bookmark;
