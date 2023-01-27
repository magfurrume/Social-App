import "./profile.css";
import Topbar from '../../componenets/topbar/Topbar';
import Sidebar from '../../componenets/sidebar/Sidebar';
import Feed from '../../componenets/feed/Feed';
import Rightbar from '../../componenets/rightbar/Rightbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router";
import { CameraAlt } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const [user, setUser] = useState({});
    const [newProfileImg, setNewProfileimg] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const username = useParams().username;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(API_CALL + `users?username=${username}`);
            setUser(res.data)
        }
        fetchUser();
    }, [username])

    const uploadHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: 'desc.current.value',
        };
        if (newProfileImg) {

            const fileData = new FormData();
            const fileName = user._id + "_" + Date.now() + "_" + newProfileImg.name;
            fileData.append("name", fileName);
            fileData.append("file", newProfileImg);
            newPost.img = fileName;

            const profileData = new FormData();
            profileData.append("userId", currentUser._id);
            profileData.append("profilePicture", fileName)
            try {
                await axios.post(API_CALL + "posts/upload", fileData);
                await axios.put(API_CALL + "users/" + currentUser._id, {
                    userId: currentUser._id,
                    profilePicture: fileName
                });
                window.location.reload();
            } catch (err) { }

        }
        // try {
        //     await axios.post(API_CALL + "posts", newPost);
        //     window.location.reload();
        // } catch (err) { }
    }
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF + user.coverPicture : PF + 'cover/noCover.jpg'} alt="" className="profileCoverImg" />
                            <div className="profilePictureSection">
                                <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} alt="" className="profileUserImg" />
                                {/* {newProfileImg && (
                                    <div className="shareImgContainer">
                                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                                        <Cancel className="shareCancelImg" onClick={() => setNewProfileimg(null)} />
                                    </div>
                                )} */}
                                {(username === currentUser.userName) && (
                                    <>
                                        <form className="profilePicChange" onSubmit={uploadHandler}>
                                            <label htmlFor="file">
                                                <CameraAlt htmlColor="black" className="uploadIcon" />
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    id="file"
                                                    accept=".png,.jpeg,.jpg"
                                                    onChange={(e) => setNewProfileimg(e.target.files[0])}
                                                />
                                            </label>
                                            <button className="shareButton" type="submit">
                                                Share
                                            </button>
                                        </form>

                                    </>
                                )}



                            </div>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.userName}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
