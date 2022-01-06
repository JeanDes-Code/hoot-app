import React, { useState } from 'react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const SignUpForm = () => {
    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [controlPassword,setControlPassword] = useState('')
    const terms = document.getElementById('terms')

    const handleRegister = async(e) => {
        e.preventDefault();
        const terms = document.getElementById('terms')
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const termsError = document.querySelector('.terms.error');
        
        passwordConfirmError.innerHTML = "";
        termsError.innerHTML = "";

        if(password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas"
            }
            if (!terms.checked) {
                termsError.innerHTML = "Veuillez vendre votre âme."
            } 
        } else {
            await axios({
                method: 'POST',
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                data: {
                    pseudo,
                    email,
                    password
                }
            })
            .then((res) => {
                if (res.data.errors) {
                    pseudoError.innerHTML = res.data.errors.pseudo
                    emailError.innerHTML = res.data.errors.email
                    passwordError.innerHTML = res.data.errors.password
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    };

    return (
        <form action="" onSubmit={handleRegister} id="sign-up-form" >
            <label htmlFor="pseudo">Pseudo</label>
            <br />
            <input type="text" name="pseudo" id="pseudo" value={pseudo} onChange={(e)=> setPseudo(e.target.value)} />
            <br />
            <div className="pseudo error"></div>
            <br />

            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name="email" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
            <br />
            <div className="email error"></div>
            <br />

            <label htmlFor="password"> Mot de passe</label>
            <br />
            <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            <br />
            <div className="password error"></div>
            <br />

            <label htmlFor="password-conf"> Confirmer le mot de passe</label>
            <br />
            <input type="password" name="password" id="password-conf" value={controlPassword} onChange={(e)=> setControlPassword(e.target.value)} />
            <br />
            <div className="password-confirm error"></div>
            <br />

            <input type="checkbox" id="terms" />
            <label htmlFor="terms"> J'accepte de <a href="/" target="_blank" rel="noopener noreferrer">vendre mon âme.</a></label>
            <div className="terms error"></div>
            <br />

            <input type="submit" value="Valider inscription" />
        </form>
    )
};

export default SignUpForm;
