// imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var carsCtrl = require('./routes/cars');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);
    apiRouter.route('/user/me/').get(usersCtrl.getUserProfil);

    // Cars routes
    apiRouter.route('/user/vehicle/newCar').post(carsCtrl.newCars);

    return apiRouter;
})();