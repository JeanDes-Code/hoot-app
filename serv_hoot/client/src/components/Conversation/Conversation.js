/* eslint-disable no-unused-vars */
import { isEmpty } from 'components/Utils';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from './../AppContext';

const Conversation = ({ conversation }) => {
    const uid = useContext(UidContext);
    const [friend, setFriend] = useState(null);
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== uid);
        const fetchFriendData = () => {
            if (!isEmpty(usersData[0])) {
                usersData.map((user) => {
                    if (user._id === friendId) {
                        setFriend(user);
                    } else {
                        return;
                    }
                });
            } else {
                console.log('Problème de récupération des données ...');
            }
        };
        fetchFriendData();
    }, [usersData, uid]);
    return (
        <div className="conversation">
            {friend !== null && (
                <img
                    className="conversation-img"
                    src={
                        friend.picture
                            ? friend.picture
                            : './uploads/profil/random-user.png'
                    }
                    alt="friend-pic"
                />
            )}
            {friend !== null && (
                <span className="conversation-name"> {friend.pseudo} </span>
            )}
        </div>
    );
};

export default Conversation;
