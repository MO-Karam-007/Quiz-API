const http = require('http');

// Connect to Database
require('dotenv').config({});

const mongoose = require('mongoose');
async function connectToDB() {
    await mongoose
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
}
connectToDB();

require('./models/User');
require('./models/Question');
require('./models/Quiz');
require('./models/Score');
require('./models/Score');

const app = require('./app');

const server = http.createServer(app);
// Set the refresh interval
// const refreshInterval = 15000; // 5 seconds

// // Function to refresh the server
// function refreshServer() {
//     server.close(() => {
//         console.log('Server is refreshed');
//         server.listen(process.env.PORT || 9090); // Change the port number if needed
//     });
// }

server.listen(process.env.PORT || 9090, () => {
    return console.log('Server is running');
});

// setInterval(refreshServer, refreshInterval);

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
