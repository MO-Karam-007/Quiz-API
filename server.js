const http = require('http');
const app = require('./app');
require('dotenv').config({});
const server = http.createServer(app);

// const mongoose = require('mongoose');

// mongoose
//     .connect(
//         process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD),
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(console.log(`DB Connected`))

//     .catch((err) => {
//         console.log(`Error`, err);
//     });

// const MongoClient = require('mongodb').MongoClient;
// console.log(`LOl`);
// MongoClient.connect(process.env.DB_URL, function (err, db) {
//     if (!err) {
//         console.log('We are connected');
//     }
// });
server.listen(process.env.PORT || 9090, () => {
    return console.log('Server is running');
});
