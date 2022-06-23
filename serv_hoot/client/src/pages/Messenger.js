/* eslint-disable no-unused-vars */
import ChatOnline from 'components/ChatOnline/ChatOnline';
import LeftNav from 'components/LeftNav';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Conversation from './../components/Conversation/Conversation';
import Message from './../components/Message/Message';
import { UidContext } from 'components/AppContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import { isEmpty } from './../components/Utils';
import SearchResultsHandler from './../components/Conversation/SearchResultsHandler';

const Messenger = () => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const userData = useSelector((state) => state.userReducer);
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);
    const [isSearching, setIsSearching] = useState(false);
    const [conversations, setConversations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
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
            if (!isEmpty(userData)) {
                setOnlineUsers(
                    userData.following.filter((f) =>
                        users.some((u) => u.userId === f)
                    )
                );
            }
        });
    }, [userData]);

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
    }, [uid, userData]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                setMessages([]);
                if (currentChat !== null) {
                    const res = await axios.get(
                        `${process.env.REACT_APP_API_URL}api/message/` +
                            currentChat._id
                    );
                    setMessages(res.data);
                }
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

    const handleSearch = async (e) => {
        setSearchResults([]);
        if (
            e.target.value === '' ||
            e.target.value === ' ' ||
            e.target.value === undefined ||
            e.target.value === null
        ) {
            setIsSearching(false);
            return;
        } else {
            setIsSearching(true);
        }
        if (!isEmpty(usersData[0])) {
            usersData.filter((user) => {
                if (
                    user.pseudo.includes(e.target.value) &&
                    user.pseudo !== userData.pseudo
                ) {
                    if (!searchResults.includes(user._id)) {
                        setSearchResults([...searchResults, user._id]);
                    }
                }
            });
        }
    };
    console.log(searchResults);

    return (
        <div className="messenger">
            <LeftNav />
            <div className="main">
                <div className="chat-menu">
                    <div className="chat-menu-wrapper">
                        <input
                            placeholder="Chercher un utilisateur ..."
                            className="chat-menu-input"
                            onChange={(e) => {
                                handleSearch(e);
                            }}
                        />
                        <br />
                        {isSearching ? (
                            <div>
                                <br />
                                <h3> Résultat de recherche : </h3>
                                {searchResults.map((result) => (
                                    <div
                                        onClick={(e) => {
                                            console.log(result);
                                        }}
                                        key={result}
                                    >
                                        <SearchResultsHandler
                                            result={result}
                                            setCurrentChat={setCurrentChat}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <br />
                        <h3>Reprendre la conversation :</h3>
                        {conversations.map((conversation) => {
                            return (
                                <div
                                    onClick={() => setCurrentChat(conversation)}
                                    key={conversation._id}
                                >
                                    <Conversation conversation={conversation} />
                                </div>
                            );
                        })}
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
                                                key={message._id}
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
