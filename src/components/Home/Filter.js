import React from 'react';
import styles from './home.module.css'

const Filter = ({ filterOption, setFilterOption }) => {

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value)
  };

  return (
    <div className={styles.filter}>
      <form>
        <select 
          name="filter" 
          id="filter" 
          value={filterOption} 
          onChange={handleFilterChange}
          style={{maxWidth: '400px'}}
        >
          <option value="all bookmarks">all bookmarks</option>
          <option value="my bookmarks">my bookmarks</option>
          <option value="my public bookmarks">my public bookmarks</option>
          <option value="my private bookmarks">my private bookmarks</option>
        </select>
      </form>
    </div>
  );
};

export default Filter;