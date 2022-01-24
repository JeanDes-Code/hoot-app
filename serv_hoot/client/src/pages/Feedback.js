import { UidContext } from 'components/AppContext';
import LeftNav from 'components/LeftNav';
import Log from 'components/Log';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

const Feedback = () => {
    const uid = useContext(UidContext);
    // @ts-ignore
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="feedback">
            <LeftNav />
            {uid ? (
                <div className="main">
                    <div className="feedback-header">
                        <h4>Feedback</h4>
                    </div>
                    <div>
                        <h2>
                            Vous envoyez ce message en tant que{' '}
                            {userData.pseudo}{' '}
                        </h2>
                        <form action="" className="feedback-form">
                            <label htmlFor="subject">
                                {' '}
                                Selectionner le type de Feedback{' '}
                            </label>
                            <br />
                            <select name="subject">
                                <option> Signaler un Bug </option>
                                <option> Autre </option>
                            </select>
                            <br />
                            <label htmlFor="email"> Votre email </label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adresse email"
                            />
                            <br />
                            <label htmlFor="body"> Votre texte : </label>
                            <br />
                            <textarea name="body"></textarea>
                            <br />
                            <input type="submit" value="Envoyer" />
                        </form>
                    </div>
                </div>
            ) : (
                <Log signin={true} signup={false} />
            )}
        </div>
    );
};

export default Feedback;
