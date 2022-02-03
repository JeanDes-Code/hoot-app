import React from 'react';
import { useSelector } from 'react-redux';

const SearchResultsHandler = ({ result }) => {
    // @ts-ignore
    const usersData = useSelector((state) => state.usersReducer);

    return (
        <div className="conversation">
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
