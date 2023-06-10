const express = require('express');
const arcController = require('./archive.Controller');
const arcRoute = express.Router();
const { verfyToken } = require('../../middlewares/jwt');
arcRoute.route('/archive/all').get(arcController.getallArchive);
arcRoute.route('/archive/one/:id').get(arcController.getOneArchive);
arcRoute.route('/archive/:id').post(arcController.editArchive);
arcRoute
    .route('/archive/change_status/:id')
    .put(verfyToken, arcController.changeStatus);

module.exports = arcRoute;
