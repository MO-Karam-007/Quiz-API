const http = require('http');
const app = require('./app');
require('dotenv').config({});
const server = http.createServer(app);

const mongoose = require('mongoose');

mongoose
    .connect(process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD))
    .then(console.log(`DB Connected`))
    .then(
        server.listen(process.env.PORT || 3000, () => {
            return console.log('Server is running');
        })
    )
    .catch((err) => {
        console.log(`Error`, err);
    });
