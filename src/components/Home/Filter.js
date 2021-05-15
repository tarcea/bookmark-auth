import React from 'react';

const Filter = ({ filterOption, setFilterOption }) => {

  const handleFilterChange = (e) => {
    setFilterOption(e.target.value)
  };

  return (
    <div>
      <form>
        <label>filter </label>
        <select 
          name="filter" 
          id="filter" 
          value={filterOption} 
          onChange={handleFilterChange}
        >
          <option value="all bookmarks">all bookmarks</option>
          <option value="my public bookmarks">my public bookmarks</option>
          <option value="my private bookmarks">my private bookmarks</option>
        </select>
      </form>
    </div>
  );
};

export default Filter;