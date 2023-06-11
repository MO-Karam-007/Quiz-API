const express = require('express');
const arcController = require('./archive.Controller');
const arcRoute = express.Router();
const { verfyToken } = require('../../middlewares/jwt');
arcRoute.route('/archive/all').get(verfyToken, arcController.getallArchive);
arcRoute.route('/archive/one/:id').get(verfyToken, arcController.getOneArchive);
arcRoute
    .route('/archive/change_status/:id')
    .put(verfyToken, arcController.changeStatus);

module.exports = arcRoute;
