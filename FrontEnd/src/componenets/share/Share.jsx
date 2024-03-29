import React from 'react';
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const API_CALL = process.env.REACT_APP_BACKEND_API;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = user._id + "_" + Date.now() + "_" + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            try {
                await axios.post(API_CALL + "posts/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post(API_CALL + "posts", newPost);
            window.location.reload();
        } catch (err) { }
    };

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} alt="" className="shareProfileImg" />
                    <input
                        placeholder={'Whats on your mind ' + user.userName}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className='shareHr' />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    )
}
