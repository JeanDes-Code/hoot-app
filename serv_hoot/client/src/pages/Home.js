import React, { useContext } from 'react';
import LeftNav from 'components/LeftNav';
import Thread from './../components/Thread';
import { UidContext } from 'components/AppContext';
import NewPostForm from './../components/Post/NewPostForm';
import Log from './../components/Log';
import Trends from 'components/Trends';
import FriendsHint from './../components/Profil/FriendsHint';
import ScrollTop from 'react-scrolltop-button';

const Home = () => {
    const uid = useContext(UidContext);
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid ? (
                        <NewPostForm />
                    ) : (
                        <Log signin={true} signup={false} />
                    )}
                </div>
                <Thread />
                <ScrollTop
                    text="Haut de page"
                    distance={100}
                    breakpoint={3000}
                    style={{
                        backgroundColor: '#ff7b77',
                        color: 'white',
                        border: 'none',
                    }}
                    className="scroll-your-role"
                    speed={500}
                    target={75}
                />
            </div>
            <div className="right-side">
                <div className="right-side-container">
                    <div className="wrapper">
                        <Trends />
                        {uid && <FriendsHint />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
