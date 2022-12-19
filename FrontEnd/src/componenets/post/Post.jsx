import React from 'react';
import "./post.css";
import { MoreVert } from '@material-ui/icons';
import { Users } from "../../dummyData"

export default function Post({ post }) {
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
                        <img className="postLike" src="/assets/like.png" alt="" />
                        <img className="postLike" src="/assets/heart.png" alt="" />
                        <span className="postLikeCounter">{post.like} People like this</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
