import React from 'react';
import "./post.css";
import { MoreVert } from '@material-ui/icons';
import { Users } from "../../dummyData"
import { useState } from 'react';

export default function Post({ post }) {
    const [like, setLike] = useState(post.like);
    const [isliked, setIsLiked] = useState(false);


    const likeHandler = () => {
        setLike(isliked ? like - 1 : like + 1);
        setIsLiked(!isliked);
    };
    const findUser = Users.filter((u) => u.id === post.userId); // Find user Along with post
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={findUser[0].profilePicture} alt="" className="postProfileImg" />
                        <span className="postUsername">{findUser[0].username}</span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.photo} alt="" className="postImg" />
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
