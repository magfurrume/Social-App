import React, { useState } from 'react';
import "./topbar.css";
import { Search, Chat, Notifications, Person, ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    ////
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8800/api/users/search?name=${searchTerm}`);
            setSearchResults(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    console.log(searchTerm);
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className='logo'>facebook</span>
                </Link>
            </div>
            <div className="topbarCenter" onChange={handleSearch}>
                <form className="searchbar">
                    <Search className='searchIcon' />
                    <input
                        placeholder='Search Facebook'
                        className="searchInput"
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </form>
                {searchResults.length > 0 && (
                    <div className='searchResultContainer'>
                        <div style={{ width: '100%' }}>
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
                        </div>
                    </div>
                )}

            </div>
            <div className="topbarRight">
                <div className="topbarRightContent">

                    {/* <div className="topbarLink">
                    <span className="topbarLinks">Homepage</span>
                    <span className="topbarLinks">TimeLine</span>
                </div> */}
                    <div className="topbarIcons">
                        {/* <div className="topbarIconItem">
                        <Person /> Friend Request Notification 
                        <span className="topbarIconBadge">1</span>
                    </div> */}
                        <div className="topbarIconItem">
                            {/* <Chat /> */}
                            <img src={`${PF}/icon/messenger.png`} alt="" className="topbarImg" />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <img src={`${PF}/icon/bell-ring.png`} alt="" className="topbarImg" />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications className="topbarImg" onClick={handleLogout} />
                        </div>
                    </div>
                    <div className="topbarAccount">
                        <Link to={"/profile/" + user.userName}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} alt="" className="topbarAccountImg" />
                        </Link>
                        <span className="topbarAccountBadge"><ExpandMore /></span>
                    </div>

                </div>

            </div>
        </div>
    )
}
