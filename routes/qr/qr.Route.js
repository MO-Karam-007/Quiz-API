var express = require('express');
const qrRoute = express.Router();

const qr = require('../../utils/qr');

qrRoute.route('/qr').get(qr.generateQRCode);

module.exports = qrRoute;
