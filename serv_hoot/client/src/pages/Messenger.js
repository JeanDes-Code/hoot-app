/* eslint-disable no-unused-vars */
import ChatOnline from 'components/ChatOnline/ChatOnline';
import LeftNav from 'components/LeftNav';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Conversation from './../components/Conversation/Conversation';
import Message from './../components/Message/Message';
import { UidContext } from 'components/AppContext';
import axios from 'axios';
import { io } from 'socket.io-client';

const Messenger = () => {
    const uid = useContext(UidContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        // @ts-ignore
        socket.current = io('ws://localhost:8900');
        // @ts-ignore
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        // @ts-ignore
        socket.current.emit('addUser', uid);
        // @ts-ignore
        socket.current.on('getUsers', (users) => {
            setOnlineUsers(users);
        });
    }, [uid]);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}api/conversation/` + uid
                );
                setConversations(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getConversations();
    }, [uid]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setMessages([]);
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}api/message/` +
                        currentChat?._id
                );
                setMessages(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    useEffect(() => {
        if (scrollRef) {
            // @ts-ignore
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            return;
        }
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: uid,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find((member) => member !== uid);

        // @ts-ignore
        socket.current.emit('sendMessage', {
            senderId: uid,
            receiverId,
            text: newMessage,
        });
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}api/message/`,
                message
            );
            // @ts-ignore
            setMessages([...messages, res.data]);
            setNewMessage('');
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmitOnEnter = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(e);
        } else return;
    };

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
                        {conversations.map((conversation) => (
                            <div
                                onClick={() => setCurrentChat(conversation)}
                                key={conversation._id}
                            >
                                <Conversation conversation={conversation} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chat-box">
                    <div className="chat-box-wrapper">
                        {currentChat ? (
                            <>
                                <div className="chat-box-top">
                                    {messages.map((message) => (
                                        <div ref={scrollRef} key={message._id}>
                                            <Message
                                                message={message}
                                                own={message.sender === uid}
                                                messageSender={message.sender}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="chat-box-bottom">
                                    <textarea
                                        className="chat-message-input"
                                        placeholder="Ecrire un message ..."
                                        onChange={(e) =>
                                            setNewMessage(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            handleSubmitOnEnter(e)
                                        }
                                        required
                                        minLength={1}
                                        value={newMessage}
                                    ></textarea>
                                    <button
                                        className="chat-message-submit"
                                        onClick={handleSubmit}
                                    >
                                        Envoyer{' '}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="no-conversation-text">
                                {' '}
                                Ouvre une conversation pour commencer à discuter{' '}
                            </span>
                        )}
                    </div>
                </div>
                <div className="chat-online">
                    <div className="chat-online-wrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
