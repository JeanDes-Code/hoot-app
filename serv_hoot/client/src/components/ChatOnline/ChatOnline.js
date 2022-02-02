/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from './../AppContext';

const ChatOnline = ({ onlineUsers, setCurrentChat }) => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const userData = useSelector((state) => state.userReducer);
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        setFriends(userData.following);
        console.log(userData.following);
        console.log(friends);
    }, []);

    return (
        <div className="chat-online">
            <div className="chat-online-friend">
                <div className="chat-online-img-container">
                    <img
                        className="chat-online-img"
                        src="./uploads/profil/Yarvem.jpg"
                        alt="friend-pic"
                    />
                    <div className="chat-online-badge"></div>
                </div>
                <span className="chat-online-name">John Doe</span>
            </div>
        </div>
    );
};

export default ChatOnline;
