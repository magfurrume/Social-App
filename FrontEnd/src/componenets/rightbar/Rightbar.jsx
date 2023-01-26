import React from 'react';
import "./rightbar.css";
import Online from '../online/Online';
import { Users } from '../../dummyData';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from '@material-ui/icons';


export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const API_CALL = process.env.REACT_APP_BACKEND_API;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);
  
  // Follow Unfollow
  useEffect(() => {

    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser, user?._id]);
  // Fetch Friend List 

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(API_CALL + "users/friends/" + user?._id)
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, [user]);

  const folloHandler = async () => {
    try {
      if (followed) {
        await axios.put(API_CALL + "users/" + user._id + "/unfollow", { userId: currentUser._id })
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else
        await axios.put(API_CALL + "users/" + user._id + "/follow", { userId: currentUser._id })
        dispatch({ type: "FOLLOW", payload: user._id });

    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  }


  const HomeRightBar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Sponsored</h4>
        <img className='rightbarAd' src={`${PF}ad.jpg`} alt="" />
        <h4 className="rightbarTitle">Birthdays</h4>
        <div className="birthdayContainer">
          <img src={PF + "gift.png"} alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Ishmam</b> and <b>2 other friends</b> have birthday today</span>
        </div>

        <h4 className="rightbarTitle">Contacts</h4>
        <ul className="rightbarFriendList">
          {
            Users.map(u => (

              <Online key={u.id} user={u} />
            ))
          }
        </ul>
      </>
    )
  }
  const ProfileRightBar = () => {
    return (
      <>
        {user.userName !== currentUser.userName && (
          <button className="rightbarFollowButton" onClick={folloHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="profileRightbarTitle">User Information</h4>
        <div className="profileRightbarInfo">
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">Current City:</span>
            <span className="profileRightbarInfoValue">Dhaka</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">Home Town:</span>
            <span className="profileRightbarInfoValue">Khulna</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">City:</span>
            <span className="profileRightbarInfoValue">{user.city}</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">Relationship:</span>
            <span className="profileRightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "In a Relationship" : "Married"}</span>
          </div>
        </div>
        <h4 className="profileRightbarTitle">User Friends</h4>
        <div className="profileRightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.userName}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              <div className="profileRightbarFollowing">
                <img
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/noAvater.png'}
                  alt="" className="profileRightbarFollowingImg"
                />
                <span className="profileRightbarFollowingUser">{friend.userName}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  }
  return (
    <div className='ritghtbar'>
      <div className="rightbarWrapepr">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
