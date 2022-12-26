import React from 'react';
import "./post.css";
import { MoreVert } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isliked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchUser = async ()=>{
          const res = await axios.get(`users/${post.userId}`);
          setUser(res.data)
        }
        fetchUser();
      }, [])

      
    const likeHandler = () => {
        setLike(isliked ? like - 1 : like + 1);
        setIsLiked(!isliked);
    };
//    const findUser = user.filter((u) => u.id === post.userId); // Find user Along with post
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={PF+user.profilePicture ||  PF+"person/noAvater.png"} alt="" className="postProfileImg" />
                        <span className="postUsername">{user.userName}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postLike" src="/assets/like.png" onClick={likeHandler} alt="" />
                        <img className="postLike" src="/assets/heart.png" onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{isliked ? ` You and ${like} People liked this` : `${like}People liked this`}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
