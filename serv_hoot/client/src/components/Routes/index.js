import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';
import Feedback from './../../pages/Feedback';
import Messenger from './../../pages/Messenger';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profil" exact component={Profil} />
                <Route path="/trending" exact component={Trending} />
                <Route path="/feedback" exact component={Feedback} />
                <Route path="/messenger" exact component={Messenger} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default index;
