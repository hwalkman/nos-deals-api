// imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var carsCtrl = require('./routes/carsCtrl');
var motorbikeCtrl = require('./routes/motorbikeCtrl');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);
    apiRouter.route('/user/me/').get(usersCtrl.getUserProfil);

    // Cars routes
    apiRouter.route('/user/vehicle/newCar').post(carsCtrl.newCars);
    apiRouter.route('/user/vehicle/car').get(carsCtrl.getCars);

    // Motobike route
    apiRouter.route('/user/vehicle/newMotorbike').post(motorbikeCtrl.newMotorbike);
    apiRouter.route('/user/vehicle/motorbike').get(motorbikeCtrl.getMotorbikes);


    return apiRouter;
})();