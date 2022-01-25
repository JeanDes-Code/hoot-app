import { UidContext } from 'components/AppContext';
import LeftNav from 'components/LeftNav';
import React, { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import emailjs from '@emailjs/browser';

const Feedback = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const uid = useContext(UidContext);
    // @ts-ignore
    const userData = useSelector((state) => state.userReducer);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_69gxm0c',
                'template_qd598mb',
                e.target,
                'user_rb4r7A4Focgvq9LUqWvat'
            )
            .then(
                (result) => {
                    console.log(result.text, 'Email sent');
                    setSuccess('Votre email a bien été envoyé.');
                    setError('');
                },
                (error) => {
                    console.log(error.text);
                    setError(
                        "Impossible d'envoyer votre email, réessayez plus tard."
                    );
                    setSuccess('');
                }
            );
        e.target.reset();
    };

    return (
        <div className="feedback">
            <LeftNav />
            {uid ? (
                <div className="main">
                    <div>
                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="feedback-form"
                        >
                            <label htmlFor="subject"> Objet du mail : </label>
                            <select name="subject">
                                <option> Signaler un Bug </option>
                                <option> Autre demande </option>
                            </select>
                            <br />
                            <br />
                            <input
                                type="hidden"
                                name="pseudo"
                                value={userData.pseudo}
                            />

                            <label htmlFor="email">
                                {' '}
                                Votre adresse email : {userData.email}{' '}
                            </label>
                            <br />
                            <input
                                type="email"
                                hidden
                                name="email"
                                value={userData.email}
                            />
                            <br />
                            <br />

                            <label htmlFor="message"> Votre texte : </label>
                            <br />
                            <textarea name="message" required></textarea>
                            <br />
                            <br />

                            {success ? (
                                <>
                                    <span className="success"> {success} </span>
                                    <br />
                                    <br />
                                </>
                            ) : null}
                            {error ? (
                                <>
                                    <span className="error"> {error} </span>
                                    <br />
                                    <br />
                                </>
                            ) : null}

                            <input type="submit" value="Envoyer" />
                        </form>
                    </div>
                </div>
            ) : (
                <div className="main">
                    <h4 className="feedback-connection-error error">
                        {' '}
                        <img
                            src="./img/icons/disconnected.svg"
                            alt="disconnected-logo"
                        />
                        Vous n'êtes pas connecté !
                    </h4>
                </div>
            )}
        </div>
    );
};

export default Feedback;
