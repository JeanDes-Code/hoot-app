const express = require('express');
const userRoutes = require('./routes/user.routes');
const bodyParser = require('body-parser');
//CONNECT DB
require('./config/db');

//DOTENV CONFIG
require('dotenv').config({ path: './config/.env' });
const ENV = process.env;

//USE EXPRESS
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/user', userRoutes);

//Server
app.listen(ENV.PORT, () => {
    console.log(`Listening on port ${ENV.PORT}`);
});
