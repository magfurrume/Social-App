import React from 'react';
import './sidebar.css';
import CloseFriends from '../closeFriends/CloseFriends';
import { Users } from '../../dummyData';
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
                    {
                        Users.map(u => (

                            <CloseFriends key={u.id} user={u} />
                        ))
                    }

                </ul>
            </div>
        </div>
    )
}
