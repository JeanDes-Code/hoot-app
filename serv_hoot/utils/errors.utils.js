module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' };

    if (err.message.includes('pseudo'))
        errors.pseudo = 'Ce pseudo est incorrect (3 caractères minimum)';

    if (err.message.includes('email')) errors.email = 'Email incorrect';

    if (err.message.includes('password'))
        errors.password = 'Votre mot de passe doit faire 6 caractères minimum';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'Cet email est déjà enregistré';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = 'Ce pseudo est déjà pris';

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.message.includes('email')) errors.email = 'Email inconnu';

    if (err.message.includes('password'))
        errors.password = 'Mot de passe incorrect';

    return errors;
};

module.exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: '' };

    if (err.message.includes('invalid file'))
        errors.format = 'Format de fichier incompatible';
    if (err.message.includes('max size'))
        errors.maxSize = 'Le fichier image dépasse la taille maximale (500Ko).';

    return errors;
};
