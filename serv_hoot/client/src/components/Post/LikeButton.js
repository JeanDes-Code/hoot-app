import { UidContext } from 'components/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from './../../actions/post.actions';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post._id, uid));
        setLiked(true);
    };
    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    };

    useEffect(() => {
        if (post.likers.includes(uid)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [uid, post.likers, liked]);

    return (
        <div className="like-container">
            {uid === null && (
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour pouvoir liker un post !</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img
                    src="./img/icons/heart.svg"
                    alt="clik-to-like"
                    onClick={like}
                />
            )}
            {uid && liked === true && (
                <img
                    src="./img/icons/heart-filled.svg"
                    alt="clik-to-unlike"
                    onClick={unlike}
                />
            )}
            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButton;
