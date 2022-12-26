import React from 'react';
import "./topbar.css";
import { Search, Chat, Notifications, Person } from '@material-ui/icons'
import { Link } from 'react-router-dom';

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='topbarContainer'>
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className='logo'>facebook</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className='searchIcon' />
                    <input placeholder='Search Facebook' className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLink">
                    <span className="topbarLinks">Homepage</span>
                    <span className="topbarLinks">TimeLine</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <img src={`${PF}/person/pirsaheb.jpg`} alt="" className="topbarImg" />
            </div>

        </div>
    )
}
