var express = require('express');
const qrRoute = express.Router();

const qr = require('./qr');

qrRoute.route('/qr').get(qr.generateQRCode);

module.exports = qrRoute;
