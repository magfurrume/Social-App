import React from 'react';
import "./rightbar.css";
import Online from '../online/Online';
import { Users } from '../../dummyData';

export default function Rightbar() {
  return (
    <div className='ritghtbar'>
      <div className="rightbarWrapepr">
        <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Ishmam</b> and <b>2 other friends</b> have birthday today</span>
        </div>
        <img className='rightbarAd' src="/assets/ad.jpg" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map(u => (

              <Online key={u.id} user={u} />
            ))
          }

        </ul>
      </div>
    </div>
  )
}
