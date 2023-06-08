import React, { useEffect, useState } from 'react';
import Bookmarks from './Bookmarks';
import styles from './bookmarks.module.css';

const Search = ({ items }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setData(items);
  }, [items]);

  const dSearch = () => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className={styles.searchForm}>
      <input
        type='text'
        value={searchTerm}
        onChange={editSearchTerm}
        placeholder='Search'
      />
      <Bookmarks items={dSearch()} />
    </div>
  );
};

export default Search;
