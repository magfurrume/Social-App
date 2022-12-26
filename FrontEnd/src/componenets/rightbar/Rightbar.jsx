import React from 'react';
import "./rightbar.css";
import Online from '../online/Online';
import { Users } from '../../dummyData';

export default function Rightbar({ profile }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Ishmam</b> and <b>2 other friends</b> have birthday today</span>
        </div>
        <img className='rightbarAd' src={`${PF}/ad.jpg`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
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
            <span className="profileRightbarInfoValue">Khulna</span>
          </div>
          <div className="profileRightbarInfoItem">
            <span className="profileRightbarInfoKey">Relationship:</span>
            <span className="profileRightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="profileRightbarTitle">User Friends</h4>
        <div className="profileRightbarFollowings">
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/amita.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">Amita</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/ishmam.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">Ishmam</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/rony.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">Mahfuz Rony</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/nishat.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">Abdullah Arif Nishat</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/mahima.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">Mahima Akter Mou</span>
          </div>
          <div className="profileRightbarFollowing">
            <img src={`${PF}/person/rayin.jpg`} alt="" className="profileRightbarFollowingImg" />
            <span className="profileRightbarFollowingUser">SYed Rayin</span> 
          </div>
        </div>
      </>
    )
  }
  return (
    <div className='ritghtbar'>
      <div className="rightbarWrapepr">
        {profile ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  )
}
