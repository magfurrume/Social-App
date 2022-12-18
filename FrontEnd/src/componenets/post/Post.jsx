import React from 'react';
import "./post.css";
import { MoreVert } from '@material-ui/icons';

export default function Post() {
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src="/assets/person/pirsaheb.jpg" alt="" className="postProfileImg" />
                        <span className="postUsername">Pir Saheb</span>
                        <span className="postDate">5 mins ago</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">My First Text</span>
                    <img src="/assets/post/1.jpg" alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postLike" src="/assets/like.png" alt="" />
                        <img className="postLike" src="/assets/heart.png" alt="" />
                        <span className="postLikeCounter">32 people liked it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">9 Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
