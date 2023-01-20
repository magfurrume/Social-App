import "./profile.css";
import Topbar from '../../componenets/topbar/Topbar';
import Sidebar from '../../componenets/sidebar/Sidebar';
import Feed from '../../componenets/feed/Feed';
import Rightbar from '../../componenets/rightbar/Rightbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";

export default function Profile() {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?username=Nahidul%20Islam%20Neon`);
            console.log(res);
            setUser(res.data)
        }
        fetchUser();
    }, [])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={`${PF}/post/1.jpg`} alt="" className="profileCoverImg" />
                            <img src={`${PF}${user.profilePicture}`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.userName}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="Ishmam"/>
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}
