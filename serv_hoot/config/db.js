const mongoose = require('mongoose');
const ENV = process.env;
//Connect DB :
mongoose
    .connect('mongodb+srv://' + ENV.USER + ':' + ENV.PASS + ENV.HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));
