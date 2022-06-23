const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const conversationRoutes = require('./routes/conversation.routes')
const messageRoutes = require('./routes/message.routes')

//DOTENV CONFIG
require('dotenv').config({ path: './config/.env' });
const ENV = process.env;

const { checkUser, requireAuth } = require('./middleware/auth.middleware');
const cors = require('cors');


//CONNECT DB
require('./config/db');

//USE EXPRESS
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
};
app.use(cors(corsOptions));

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
app.use('/api/conversation', conversationRoutes);
app.use('/api/message', messageRoutes);

//Server
app.listen(ENV.PORT, () => {
    console.log(`Listening on port ${ENV.PORT}`);
});
