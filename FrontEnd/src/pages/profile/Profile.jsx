import "./profile.css";
import Topbar from '../../componenets/topbar/Topbar';
import Sidebar from '../../componenets/sidebar/Sidebar';
import Feed from '../../componenets/feed/Feed';
import Rightbar from '../../componenets/rightbar/Rightbar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router";
import { CameraAlt, Cancel } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const [user, setUser] = useState({});
    const [newProfileImg, setNewProfileImg] = useState(null);
    const [newCoverImg, setNewCoverImg] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const username = useParams().username;
    const { user: currentUser, dispatch } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(API_CALL + `users?username=${username}`);
            setUser(res.data)
        }
        fetchUser();
    }, [username])

    const profilImgUploadHandler = async (e) => {
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
                dispatch({ type: "PROFILEPICTURE", payload: fileName });
                window.location.reload();
                //  dispatch({ type: "PROFILEPICTURE", payload: user._id });
            } catch (err) { }

        }

        if (newCoverImg) {
            const fileData = new FormData();
            const fileName = user._id + "_" + Date.now() + "_" + newCoverImg.name;
            fileData.append("name", fileName);
            fileData.append("file", newCoverImg);
            newPost.img = fileName;

            const profileData = new FormData();
            profileData.append("userId", currentUser._id);
            profileData.append("profilePicture", fileName)
            try {
                console.log(fileName);
                await axios.post(API_CALL + "posts/upload", fileData);
                await axios.put(API_CALL + "users/" + currentUser._id, {
                    userId: currentUser._id,
                    coverPicture: fileName
                });
                // dispatch({ type: "PROFILEPICTURE", payload: fileName });
                window.location.reload();
                //  dispatch({ type: "PROFILEPICTURE", payload: user._id });
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
                            <div>
                                <img src={user.coverPicture ? PF + user.coverPicture : PF + 'cover/noCover.jpg'} alt="" className="profileCoverImg" />
                                {(username === currentUser.userName) && (
                                    <>
                                        <form className="coverPicChange" onSubmit={profilImgUploadHandler}>
                                            <label htmlFor="coverImgCng">
                                                <CameraAlt htmlColor="black" className="coverChangeIcon" />
                                                <span>Edit cover photo</span>
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    id="coverImgCng"
                                                    accept=".png,.jpeg,.jpg"
                                                    onChange={(e) => setNewCoverImg(e.target.files[0])}
                                                />
                                            </label>
                                            {newCoverImg && (
                                                <div className="coverImgContainer">
                                                    <img className="coverImg" src={URL.createObjectURL(newCoverImg)} alt="" />
                                                    <Cancel className="profileCancelImg" onClick={() => setNewCoverImg(null)} />
                                                    <button className="shareButton" type="submit">
                                                        Upload
                                                    </button>
                                                </div>
                                            )}
                                        </form>
                                    </>
                                )}
                            </div>


                            <div className="profilePictureSection">
                                <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} alt="" className="profileUserImg" />
                                {(username === currentUser.userName) && (
                                    <>
                                        <form className="profilePicChange" onSubmit={profilImgUploadHandler}>
                                            <label htmlFor="profileImgCng">
                                                <CameraAlt htmlColor="black" className="uploadIcon" />
                                                <input
                                                    style={{ display: "none" }}
                                                    type="file"
                                                    id="profileImgCng"
                                                    accept=".png,.jpeg,.jpg"
                                                    onChange={(e) => setNewProfileImg(e.target.files[0])}
                                                />
                                            </label>
                                            {newProfileImg && (
                                                <div className="profileImgContainer">
                                                    <img className="profileImg" src={URL.createObjectURL(newProfileImg)} alt="" />
                                                    <Cancel className="profileCancelImg" onClick={() => setNewProfileImg(null)} />
                                                    <button className="shareButton" type="submit">
                                                        Upload
                                                    </button>
                                                </div>
                                            )}
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
