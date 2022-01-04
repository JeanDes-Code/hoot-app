const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');

//DOTENV CONFIG
require('dotenv').config({ path: './config/.env' });
const ENV = process.env;

//CONNECT DB
require('./config/db');

//USE EXPRESS
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt middleware
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//Server
app.listen(ENV.PORT, () => {
    console.log(`Listening on port ${ENV.PORT}`);
});
