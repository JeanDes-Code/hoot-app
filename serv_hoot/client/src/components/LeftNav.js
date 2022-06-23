import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';

const LeftNav = () => {
    const uid = useContext(UidContext);
    const [msgNotif, setMsgNotif] = useState(false);
    console.log(setMsgNotif);
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/" exact activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="to-home-page" />
                    </NavLink>
                    <br />
                    <NavLink
                        to="/trending"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img
                            src="./img/icons/rocket.svg"
                            alt="to-trending-page"
                        />
                    </NavLink>
                    <br />
                    {uid ? (
                        <>
                            <NavLink
                                to="/messenger"
                                exact
                                activeClassName="active-left-nav"
                                className="messenger-nav"
                            >
                                <img
                                    src="./img/icons/messenger.svg"
                                    alt="to-messenger-page"
                                />
                                {msgNotif ? (
                                    <div className="new-message-badge"></div>
                                ) : null}
                                <br />
                            </NavLink>
                        </>
                    ) : null}

                    <NavLink
                        to="/profil"
                        exact
                        activeClassName="active-left-nav"
                    >
                        <img src="./img/icons/user.svg" alt="to-profil-page" />
                    </NavLink>
                    {uid ? (
                        <NavLink
                            to="/feedback"
                            exact
                            activeClassName="active-left-nav"
                        >
                            <img
                                src="./img/icons/feedback.svg"
                                alt="to-feedback-page"
                            />
                        </NavLink>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default LeftNav;
