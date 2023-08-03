const http = require('http');
// const Grid = require('gridfs-stream');
const submit = require('./models/Submit');
// Connect to Database
require('dotenv').config({});

const mongoose = require('mongoose');

async function connectToDB() {
    const connection = await mongoose.connect(
        process.env.DB_URL.replace('<PASSWORD>', process.env.DB_PASSWORD),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );
    console.log(`DB Connected`);
    // const gfs = Grid(connection.db, connection.mongo);
    // gfs.collection('uploads');

    // // Create storage engine for multer
    // const storage = multer.diskStorage({
    //     destination: './uploads',
    //     filename: (req, file, cb) => {
    //         cb(
    //             null,
    //             file.fieldname +
    //                 '-' +
    //                 Date.now() +
    //                 path.extname(file.originalname)
    //         );
    //     },
    // });

    // Init upload
    // const upload = multer({
    //     storage: storage,
    //     limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    // });
}
connectToDB();

// console.log(`--------------------------`);
// console.log(process.argv[0]);
// console.log(process.argv[1]);
// console.log(process.argv[2]);
// console.log(process.argv[3]);
// submit.collection.dropIndex('questionId', (error, result) => {
//     if (error) {
//         console.error('Error while dropping index:', error);
//     } else {
//         console.log('Index dropped successfully:', result);
//     }
// });
require('./models/User');
require('./models/Question');
require('./models/Quiz');
require('./models/Score');
require('./models/Submit');

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
