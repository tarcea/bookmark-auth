import React, { useEffect, useState } from 'react';
import styles from './bookmarks.module.css';
import Bookmarks from './Bookmarks';

const Search = ({ items }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const editSearchTerm = (e) => {
      setSearchTerm(e.target.value)
      //console.log(searchTerm)
  };

  useEffect(() => {
    setData(items)
  },[items]);
    
  const dSearch = () => {
      return data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  };

  return (
    <div className={styles.searchForm}>
        <input type="text" 
          value={searchTerm}
          onChange={editSearchTerm}
          placeholder="Search"
        />
        <Bookmarks items={dSearch()}/>
    </div>
  );
};

export default Search;