import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchPanel = ({ onSearch, defaultSearch }) => {
  const [query, setQuery] = useState(defaultSearch);
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-block__panel">
      <div className="search-block__search">
        <form onSubmit={(e) => onFormSubmit(e)}>
          <input
            value={query}
            placeholder="Search video"
            type="text"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

SearchPanel.propTypes = {
  defaultSearch: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchPanel;
