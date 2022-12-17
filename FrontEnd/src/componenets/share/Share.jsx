import React from 'react';
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'

export default function Share() {
    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src="/assets/person/pirsaheb.jpg" alt="" className="shareProfileImg" />
                    <input placeholder='Whats in your mind Pir Saheb' className="shareInput" />
                </div>
                <hr className='shareHr' />
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareMediaIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                        </div>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareMediaIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareMediaIcon' />
                            <span className="shareOptionText">Locations</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareMediaIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}
