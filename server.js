const http = require('http');
const app = require('./app');
require('dotenv').config({});
const server = http.createServer(app);

const mongoose = require('mongoose');

mongoose
    .connect(
        process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(console.log(`DB Connected`))

    .catch((err) => {
        console.log(`Error`, err);
    });

server.listen(process.env.PORT || 3030, () => {
    return console.log('Server is running');
});
