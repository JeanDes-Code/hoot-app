import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from 'actions/post.actions';

const Deletecard = (props) => {
    const dispatch = useDispatch();

    const deleteQuote = async () => {
        await dispatch(deletePost(props.id));
    };

    return (
        <div
            className=""
            onClick={() => {
                if (
                    window.confirm(
                        'Êtes-vous sûr de vouloir supprimer cet article ?'
                    )
                ) {
                    deleteQuote();
                }
            }}
        >
            <img src="./img/icons/trash.svg" alt="delete-button" />
        </div>
    );
};

export default Deletecard;
