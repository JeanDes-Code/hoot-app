import ChatOnline from 'components/ChatOnline/ChatOnline';
import LeftNav from 'components/LeftNav';
import React from 'react';
import Conversation from './../components/Conversation/Conversation';
import Message from './../components/Message/Message';

const Messenger = () => {
    return (
        <div className="messenger">
            <LeftNav />
            <div className="main">
                <div className="chat-menu">
                    <div className="chat-menu-wrapper">
                        <input
                            placeholder="Search for friends"
                            className="chat-menu-input"
                        />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box-wrapper">
                        <div className="chat-box-top">
                            <Message own={true} />
                            <Message own={false} />
                            <Message own={true} />
                            <Message own={true} />
                            <Message own={false} />
                            <Message own={true} />
                            <Message own={true} />
                            <Message own={false} />
                            <Message own={true} />
                            <Message own={true} />
                            <Message own={false} />
                            <Message own={true} />
                        </div>
                        <div className="chat-box-bottom">
                            <textarea
                                className="chat-message-input"
                                placeholder="Ecrire un message ..."
                            ></textarea>
                            <button className="chat-message-submit">
                                Envoyer{' '}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online-wrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
