// imports
var express = require('express');
var userCtrl = require('./routes/usersCtrl');


//Router

exports.router = (function() {
    var apiRouter = express.Router();

    // Users routes
    apiRouter.route('/user/register/').post(userCtrl.register);
    apiRouter.route('/user/login/').post(userCtrl.login);
    apiRouter.route('/user/me/').get(userCtrl.getUserProfil);

    return apiRouter;
})();