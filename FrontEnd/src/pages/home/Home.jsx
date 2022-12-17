import React from 'react';
import "./home.css"
import Topbar from '../../componenets/topbar/Topbar';
import Sidebar from '../../componenets/sidebar/Sidebar';
import Feed from '../../componenets/feed/Feed';
import Rightbar from '../../componenets/rightbar/Rightbar';

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}
