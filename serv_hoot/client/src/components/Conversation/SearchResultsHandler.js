import axios from 'axios';
import { UidContext } from 'components/AppContext';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

const SearchResultsHandler = ({ result, setCurrentChat }) => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);
    console.log(result);
    const createConversation = async () => {
        const data = {
            senderId: uid,
            receiverId: result,
        };
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}api/conversation/`,
                data
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="conversation" onClick={createConversation}>
            <img
                className="conversation-img"
                src={usersData
                    .map((user) => {
                        if (user._id === result) {
                            return user.picture;
                        }
                    })
                    .join('')}
                alt="user-pic"
            />
            <span className="conversation-name">
                {' '}
                {usersData.map((user) => {
                    if (user._id === result) {
                        return user.pseudo;
                    }
                })}{' '}
            </span>
        </div>
    );
};

export default SearchResultsHandler;
