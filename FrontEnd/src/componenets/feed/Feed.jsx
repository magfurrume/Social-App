import React from 'react';
import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";


export default function Feed({ username }) {
  const API_CALL = process.env.REACT_APP_BACKEND_API;
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(API_CALL + "posts/profile/" + username)
        : await axios.get(API_CALL + "posts/timeline/" + user._id)
      setPost(res.data.sort((post1, post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt)
      }));
    }
    fetchPost();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {/* <Share /> */}
        {(!username || username === user.userName) && <Share />}
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
