/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import { useEffect } from 'react';
import { isEmpty } from 'components/Utils';

const Message = ({ message, own, messageSender }) => {
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);
    const [authorPicture, setAuthorPicture] = useState('');

    useEffect(() => {
        const fetchAuthorPicture = () => {
            if (!isEmpty(usersData[0])) {
                usersData.map((user) => {
                    if (user._id === messageSender) {
                        setAuthorPicture(user.picture);
                    } else {
                        return;
                    }
                });
            } else {
                console.log('Problème de récupération des données ...');
            }
        };
        fetchAuthorPicture();
    }, [usersData, message]);

    return (
        <div className={own ? 'message own' : 'message'}>
            <div className="message-top">
                <img
                    className="message-img"
                    src={authorPicture}
                    alt="author-pic"
                />
                <p className="message-text">{message.text}</p>
            </div>
            <div className="message-bottom"> {format(message.createdAt)} </div>
        </div>
    );
};

export default Message;
