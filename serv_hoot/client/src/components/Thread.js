import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from 'actions/post.actions';
import { isEmpty } from './Utils';
import Card from './Post/Card';

const Thread = () => {
    const [loadPost, setLoadPost] = useState(true);
    const dispatch = useDispatch();

    // @ts-ignore
    const posts = useSelector((state) => state.postReducer);

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts());
            setLoadPost(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadPost]);

    return (
        <div className="thread-container">
            {!isEmpty(posts[0]) &&
                posts.map((post) => {
                    return <Card post={post} key={post._id} />;
                })}
        </div>
    );
};

export default Thread;
