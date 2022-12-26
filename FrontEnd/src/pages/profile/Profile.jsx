import "./profile.css";
import Topbar from '../../componenets/topbar/Topbar';
import Sidebar from '../../componenets/sidebar/Sidebar';
import Feed from '../../componenets/feed/Feed';
import Rightbar from '../../componenets/rightbar/Rightbar';

export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={`${PF}/post/1.jpg`} alt="" className="profileCoverImg" />
                            <img src={`${PF}/person/rume.jpg`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Magfur Rume</h4>
                            <span className="profileInfoDesc">Hello My Friends</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile />
                    </div>
                </div>
            </div>
        </>
    )
}
