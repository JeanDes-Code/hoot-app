/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from './../AppContext';
import { isEmpty } from 'components/Utils';
import axios from 'axios';

const ChatOnline = ({ onlineUsers, setCurrentChat }) => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const userData = useSelector((state) => state.userReducer);
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
        setFriends(userData.following);
    }, [uid, userData]);

    useEffect(() => {
        setOnlineFriends(onlineUsers);
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}api/conversation/find/${uid}/${user}`
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="chat-online">
            {onlineFriends.map((onlineFriend) => (
                <div
                    className="chat-online-friend"
                    key={onlineFriend}
                    onClick={() => {
                        handleClick(onlineFriend);
                    }}
                >
                    <div className="chat-online-img-container">
                        <img
                            className="chat-online-img"
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData
                                    .map((user) => {
                                        if (user._id === onlineFriend)
                                            return user.picture;
                                        else return null;
                                    })
                                    .join('')
                            }
                            alt="friend-pic"
                        />
                        <div className="chat-online-badge"></div>
                    </div>
                    <span className="chat-online-name">
                        {!isEmpty(usersData[0]) &&
                            usersData.map((user) => {
                                if (user._id === onlineFriend)
                                    return user.pseudo;
                                else return null;
                            })}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ChatOnline;
