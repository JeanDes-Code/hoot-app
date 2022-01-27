import React from 'react';

const ChatOnline = () => {
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
