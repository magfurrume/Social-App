import React from 'react';
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';


export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const [postMedia, setPostMedia] = useState(null);
    const postText = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: postText.current.value
        }
        if (postMedia) {
            const data = new FormData();
            // const fileName = user._id + "_" + Date.now() + "_" + postMedia.name;
            const fileName = postMedia.name;
            data.append("file", postMedia)
            data.append("name", fileName)
            newPost.img = fileName;
            try {
                await axios.post("http://localhost:8800/api/posts/upload", data);

            } catch (err) {
                console.log(err)
            }

        }
        try {
            await axios.post("http://localhost:8800/api/posts", newPost);

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} alt="" className="shareProfileImg" />
                    <input
                        placeholder={'Whats on your mind ' + user.userName}
                        className="shareInput"
                        ref={postText}
                    />
                </div>
                <hr className='shareHr' />
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='postContent' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareMediaIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input
                                type="file"
                                accept=".png,.jpeg,.jpg"
                                id="postContent"
                                onChange={(e) => setPostMedia(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareMediaIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareMediaIcon' />
                            <span className="shareOptionText">Locations</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareMediaIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    )
}
