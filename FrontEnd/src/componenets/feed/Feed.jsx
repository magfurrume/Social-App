import React from 'react';
import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
// import { Posts } from "../../dummyData"

export default function Feed({ username }) {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
        : await axios.get("http://localhost:8800/api/posts/timeline/639982123af78098c03830bc")
      setPost(res.data)
    }
    fetchPost();
  }, [username]);

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
