import { UidContext } from 'components/AppContext';
import LeftNav from 'components/LeftNav';
import Trends from 'components/Trends';
import { isEmpty } from 'components/Utils';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Card from './../components/Post/Card';
import FriendsHint from './../components/Profil/FriendsHint';
import ScrollTop from 'react-scrolltop-button';

const Trending = () => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const trendList = useSelector((state) => state.trendingReducer);

    return (
        <div className="trending-page">
            <LeftNav />
            <div className="main">
                <ul>
                    {!isEmpty(trendList[0]) &&
                        trendList.map((post) => (
                            <Card post={post} key={post._id} />
                        ))}
                </ul>
                <ScrollTop
                    text="Haut de page"
                    distance={50}
                    breakpoint={3000}
                    style={{
                        backgroundColor: '#ff7b77',
                        color: 'white',
                        border: 'none',
                    }}
                    className="scroll-your-role"
                    speed={1000}
                    target={75}
                />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <Trends />
                    {uid && <FriendsHint />}
                </div>
            </div>
        </div>
    );
};

export default Trending;
