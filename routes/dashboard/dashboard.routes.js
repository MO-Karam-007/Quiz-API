const express = require('express');
const dashboardController = require('./dashboard.Controller');
const dashboardRouter = express.Router();
const { verfyToken } = require('../../middlewares/jwt');
dashboardRouter
    .route('/my_dashboard')
    .get(verfyToken, dashboardController.cheakMyDashboard);

dashboardRouter
    .route('/students_dashboard')
    .get(dashboardController.fullDashboard);

module.exports = dashboardRouter;
