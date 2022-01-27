/* eslint-disable react/prop-types */
import React from 'react';

const Message = ({ own }) => (
    <div className={own ? 'message own' : 'message'}>
        <div className="message-top">
            <img
                className="message-img"
                src="./uploads/profil/Yarvem.jpg"
                alt="conversation-pic"
            />
            <p className="message-text">
                {' '}
                lorem ipsum dolor sit amet lorem ipsum{' '}
            </p>
        </div>
        <div className="message-bottom"> 1 hour ago </div>
    </div>
);

export default Message;
