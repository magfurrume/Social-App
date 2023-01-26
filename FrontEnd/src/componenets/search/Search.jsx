import React, { useState } from 'react';
import axios from 'axios';

function Search() {
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8800/api/users/search?name=${searchTerm}`);
            setSearchResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onChange={handleSearch}>
                <p>Search</p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for items..."
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {searchResults.map(item => (
                    <li key={item._id}>{item.userName}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
