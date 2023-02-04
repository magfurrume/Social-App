import React, { useState } from 'react';
import axios from 'axios';
import "./search.css";
import { Link } from 'react-router-dom';

function Search() {
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(API_CALL+`users/search?name=${searchTerm}`);
            setSearchResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='mainDiv'>
            <form onChange={handleSearch}>
                <p>Search</p>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for items..."
                />
            </form>
            <ul>
                {searchResults.map(people => (
                    <div key={people._id} style={{ cursor: "pointer" }}>
                        <Link
                            to={"/profile/" + people.userName}
                            style={{ color: 'inherit', textDecoration: 'inherit' }}
                        >
                            <div className='searchItem' >
                                <img src={people.profilePicture ? PF + people.profilePicture : PF + 'person/noAvater.png'} className="searchImg" />
                                {people.userName}
                            </div>
                        </Link>

                    </div>
                ))}
            </ul>
            <div>
                rume
            </div>
        </div>
    );
}

export default Search;
