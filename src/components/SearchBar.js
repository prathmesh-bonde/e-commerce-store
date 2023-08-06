import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({ onSearch, fetchItemsOnSale, setSearchedItems, setCurrentPage, setItems }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = async () => {
    if (!searchInput) {
      // If the search input is empty, fetch all items again
      fetchItemsOnSale();
      setSearchedItems([]);
      return;
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${searchInput}`);
      const data = await response.json();

      // Filter items for search
    const filteredItems = data.filter((item) => {
      // Convert searchInput and item.category to lowercase for case-insensitive comparison
      const searchTerms = searchInput.toLowerCase().split(' ');
      return searchTerms.some((term) =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    });

      setSearchedItems(filteredItems);
      setCurrentPage(0);
      setItems([]); // Clear the items when searching
    } catch (error) {
      console.error('Error searching items:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search by category"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
