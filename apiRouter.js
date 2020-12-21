// imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var carsCtrl = require('./routes/carsCtrl');
var motorbikeCtrl = require('./routes/motorbikeCtrl');
var propertyCtrl = require('./routes/propertyCtrl');
var classes = require('./routes/classCtrl');
var event = require('./routes/eventCtrl');
var prestation = require('./routes/prestationCtrl');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/register/').post(usersCtrl.register);
    apiRouter.route('/user/login/').post(usersCtrl.login);
    apiRouter.route('/user/me/').get(usersCtrl.getUserProfil);

    // Cars routes
    apiRouter.route('/user/rental/vehicle/car').post(carsCtrl.newCars);
    apiRouter.route('/user/my-vehicle/car').get(carsCtrl.getCars);

    // Motobike route
    apiRouter.route('/user/rental/vehicle/motorbike').post(motorbikeCtrl.newMotorbike);
    apiRouter.route('/user/my-vehicle/motorbike').get(motorbikeCtrl.getMotorbikes);


    // Bien route
    apiRouter.route('/user/rental/immobilier/property').post(propertyCtrl.newProperty);
    apiRouter.route('/user/my-immobilier/property').get(propertyCtrl.getProperties);

    // Class route
    apiRouter.route('/user/service/class').post(classes.newClass);
    apiRouter.route('/user/my-service/class').get(classes.getClasses);

    // Event route
    apiRouter.route('/user/service/event').post(event.newEvent);
    apiRouter.route('/user/my-service/event').get(event.getEvent);

    // Prestation route
    apiRouter.route('/user/service/prestation').post(prestation.newPrestation);
    apiRouter.route('/user/my-service/prestation').get(prestation.getPrestation);


    return apiRouter;
})();