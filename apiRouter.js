// imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var carsCtrl = require('./routes/carsCtrl');
var motorbikeCtrl = require('./routes/motorbikeCtrl');
var propertyCtrl = require('./routes/propertyCtrl');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);
    apiRouter.route('/user/me/').get(usersCtrl.getUserProfil);

    // Cars routes
    apiRouter.route('/user/rental/vehicle/car').post(carsCtrl.newCars);
    apiRouter.route('/user/vehicle/car').get(carsCtrl.getCars);

    // Motobike route
    apiRouter.route('/user/rental/vehicle/motorbike').post(motorbikeCtrl.newMotorbike);
    apiRouter.route('/user/vehicle/motorbike').get(motorbikeCtrl.getMotorbikes);


    // Bien route
    apiRouter.route('/user/rental/immobilier/property').post(propertyCtrl.newProperty);
    apiRouter.route('/user/immobilier/property').get(propertyCtrl.getProperties);

    return apiRouter;
})();