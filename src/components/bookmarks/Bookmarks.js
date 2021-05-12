import React, { useEffect, useState } from 'react';
import styles from './bookmarks.module.css';
import { db, timestamp } from '../../firebase';
import Bookmark from './Bookmark';
import { useAuth } from '../../contexts/AuthContext';

const Bookmarks = () => {
  const { currentUser } = useAuth();
  const [data, setData] = useState({
    error: null,
    loading: true,
    items: [],
  });
  const { items, loading } = data;
  const [sample, setSample] = useState({
    name: "gogonel",
    createdAt: timestamp,
    userId: currentUser.uid
  });

  const createNew = async (collection, doc) => {
    await db.collection(collection).add(doc);
    console.log("created?")
  };
  
  useEffect(() => {
    const unsubscribe = db
      .collection("bookmarks")
      .orderBy("createdAt")
      .onSnapshot(
        (snapshot) => {
          setData({
            error: null,
            loading: false,
            items: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data()
            })),
          });
        },
        (error) => {
          setData({
            error: error,
            loading: false,
            items: [],
          });
        },
      );
      return () => unsubscribe();
  }, []);
  
  return (
    <div className="content-container">
      <div className="badge">
        <div className={styles.counter}>
          {items ? items.length : ''}
        </div>
      </div>
      <div className={styles.parent}>
      <h1 onClick={() => createNew("bookmarks", sample)}>creaza</h1>
        {items
            ? items.map((value, index, array) => 
            <Bookmark bookmark={array[array.length - 1 - index]} key={index} />)
            : ''}
      </div>
    </div>
  );
};

export default Bookmarks;