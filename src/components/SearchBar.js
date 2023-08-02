import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        onSearch(searchInput);
    };

    return (
        <div>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by category"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
