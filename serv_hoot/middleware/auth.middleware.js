const jwt = require('jsonwebtoken');
const { log } = require('npmlog');
const UserModel = require('../models/user.model');
const ENV = process.env;

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, ENV.TOKEN, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let user = await UserModel.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, ENV.TOKEN, async (err, decodedToken) => {
            if (err) {
                console.log('Erreur de connection : ', err);
            } else {
                console.log('User auth : ', decodedToken.id);
                next();
            }
        });
    } else {
        console.log('No token found, auth is not possible');
    }
};
