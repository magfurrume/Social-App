import React from 'react';
import './sidebar.css';
import { RssFeed, Chat, PlayCircleFilled, Group, Bookmarks, QuestionAnswerOutlined, Work, EmojiEvents, MenuBook } from '@material-ui/icons';


export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon' />
                        <span className="sidebarListItemtext">feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className='sidebarIcon' />
                        <span className="sidebarListItemtext">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilled className='sidebarIcon' />
                        <span className="sidebarListItemtext">Video</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon' />
                        <span className="sidebarListItemtext">Group</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmarks className='sidebarIcon' />
                        <span className="sidebarListItemtext">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <QuestionAnswerOutlined className='sidebarIcon' />
                        <span className="sidebarListItemtext">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <Work className='sidebarIcon' />
                        <span className="sidebarListItemtext">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <EmojiEvents className='sidebarIcon' />
                        <span className="sidebarListItemtext">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <MenuBook className='sidebarIcon' />
                        <span className="sidebarListItemtext">Cources</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img src="/assets/person/ishmam.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">Ishmam</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/rumee.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">Rume</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/rume.png" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">Rayin</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/rumee.jpg" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">Tanzeem</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/person/rume.png" alt="" className="sidebarFriendImg" />
                        <span className="sidebarFriendName">Hasan</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
