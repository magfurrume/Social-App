import React from 'react';
import "./post.css";
import { MoreVert } from '@material-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import dateFormat from "dateformat";
import getAverageColor from "get-average-color";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";



TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');


export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isliked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [imgbgColor, setImgBgColor] = useState();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [post.likes, currentUser._id])


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
            setUser(res.data)
        }
        fetchUser();

        getAverageColor(PF + post.img).then((rgb) => {
            if (rgb != undefined) {
                setImgBgColor(rgb);
            }

        })

    }, [post.userId])


    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "/like", { userId: currentUser._id })
        } catch (err) {

        }
        setLike(isliked ? like - 1 : like + 1);
        setIsLiked(!isliked);
    };
    //    const findUser = user.filter((u) => u.id === post.userId); // Find user Along with post
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.userName}`}>
                            {/* <img src={PF + user.profilePicture} alt="" className="postProfileImg" style={imgbgColor !== undefined ? { backgroundColor: `rgb(${imgbgColor.r},${imgbgColor.g}, ${imgbgColor.b})`}: { backgroundColor: 'black'}}/> */}
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + 'person/noAvater.png'} F alt="" className="postProfileImg" style={{ background: '#000' }} />
                        </Link>
                        <div className='postInfo'>
                            <div className="profileName">
                                <span className="postUsername">{user.userName}</span>
                            </div>
                            <div className='datePrivacy'>
                                <span className="postDate">
                                    {(timeAgo.format(new Date(Date.parse(post.createdAt)), 'mini'))}
                                    <span className='dateTooltip'>{dateFormat(post.createdAt, "dddd, mmmm d, yyyy, h:MM:ss TT")}</span>
                                </span>
                                <span><img src={PF + 'icon/dot.png'} alt="" className="privacyIcon" /></span>

                                <span className='privacyTooltipDiv' title={'Shared with '
                                    + (post.privacy === 1 ? 'Custom'
                                        : post.privacy === 2 ? 'Friends'
                                            : 'Public')} >
                                    <img src={
                                        post.privacy === 1 ? PF + 'icon/gear.png'
                                            : post.privacy === 2 ? PF + 'icon/people.png'
                                                : PF + 'icon/global.png'
                                    } alt="" className="privacyIcon" />

                                    <span className='privacyTooltip'>
                                        {post.privacy === 1 ? 'Custom'
                                            : post.privacy === 2 ? 'Friends'
                                                : 'Public'}
                                    </span>

                                </span>
                            </div>
                        </div>

                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" style={imgbgColor !== undefined ? { backgroundColor: `rgba(${imgbgColor.r},${imgbgColor.g}, ${imgbgColor.b}, 0.5)` } : { backgroundColor: 'black' }} />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="postLike" src={PF + "like.png"} onClick={likeHandler} alt="" />
                        <img className="postLike" src={PF + "heart.png"} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{isliked ? ` You and ${like} People liked this` : ` ${like} People liked this`}</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
