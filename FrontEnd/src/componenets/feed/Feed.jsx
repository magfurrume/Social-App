import React from 'react';
import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios";
// import { Posts } from "../../dummyData"

export default function Feed() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async ()=>{
      const res = await axios.get("http://localhost:8800/api/posts/timeline/639982123af78098c03830bc")
      setPost(res.data)
    }
    fetchPost();
  }, [])
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {post.map((p) => (
          <Post key={p.id} post={p} />
        ))}

      </div>
    </div>
  )
}
