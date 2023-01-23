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
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id)
      setPost(res.data)
    }
    fetchPost();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
