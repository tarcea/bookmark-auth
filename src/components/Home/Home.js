import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';
import CreateBookmark from '../Bookmarks/CreateBookmark';
import Search from '../Bookmarks/Search';
import Filter from './Filter';

const Home = ({ width }) => {
  const { currentUser, logout } = useAuth();
  const [filterOption, setFilterOption] = useState('all bookmarks');
  const [data, setData] = useState({
    error: null,
    loading: true,
    items: [],
  });
  const { items, loading } = data;

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

  const publicItems = (items) => {
    return items.filter(item => item.public);
  };

  const myPublicItems = (items) => {
    return publicItems(items).filter(item => item.userId === currentUser.uid)
  }

  const privateItems = (items) => {
    return items.filter(item => !item.public);
  };

  const myPrivateItems = (items) => {
    return privateItems(items).filter(item => item.userId === currentUser.uid);
  };

  const userItems = (items) => {
    return [...publicItems(items), ...myPrivateItems(items)]
  };

  const selectItemsToShow = (items) => {
    let option = [];
      switch (filterOption) {
        case "all bookmarks":
         option =  userItems(items).sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
          break;
        case "my public bookmarks":
          option = myPublicItems(items)
          break;
        case "my private bookmarks":
          option = myPrivateItems(items)
          break;
        default:
      }
    return option
  };


  return (
    <div style={{marginTop: '90px'}}>
      {currentUser 
      ? (
        <>
        <div className={styles.inputs}>
          <CreateBookmark />
          <Filter
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
        </div>
          <Search items={selectItemsToShow(items)}/>
          
        </>
        ) 
      : <Search items={publicItems(items)}/>
    }
    </div>
  );
};

export default Home;
