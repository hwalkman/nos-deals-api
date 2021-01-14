var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
const models = require('../models');


//Routes
module.exports = {
    register: function(req, res) {
        var userName = req.body.userName;
        var email = req.body.email;
        var password = req.body.password;

        if(userName == null || email == null || password == null){
            return res.status(400).json({'error' : 'missing parameters'});
        }
        
        models.Users.findOne({
            attributes: ['email'],
            where: { email: email}
        })
        .then(function(userFound){
            if(!userFound){
                bcrypt.hash(password, 5, function(err, bcryptedPassord) {
                    var newUser = models.Users.create({
                        userName: userName,
                        email: email,
                        password: bcryptedPassord
                    })
                    .then(function(newUser) {
                        return res.status(200).json({
                            'token': jwtUtils.generateTokenForUser(newUser),
                            'userName': newUser.userName
                        })
                    })
                    .catch(function(err) {
                        return res.status(500).json({'error': 'cannot add user'});
                    })
                })
            }
            else {
                return res.status(400).json({'error': 'user already exist'});
            }
        })
        .catch(function(err){
            res.status(500).json({'error': 'unable to verify user'});
        })
    },
    
    login: function(req, res) {
        
        // params
        var email = req.body.email;
        var password = req.body.password;


        if(email == null || password == null){
            return res.status(400).json({'error' : 'missing parameters'});
        }

        // TODO verify mail regex & password lenght.


        models.Users.findOne({
            where : {email: email}
        })
        .then(function(userFound){
            if(userFound){

                bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'userName': userFound.userName,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else {
                        return res.status(403).send("L'utilisateur n'existe pas");
                    }
                })
            }
            else {
                return res.status(404).json({'error' : 'user doesn\'t in database'});
            }
        })
        .catch (function(err) {
            return res.status(500).json({'error' : 'unable to verify user'});

        })
    }, 
    getUserProfil: function(req, res) {
        // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

        if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Users.findOne({
            attributes: ['userName'],
            where: { id: userId}
        })
        .then(function(userProfil) {
            if(userProfil != null) {
                res.status(200).json(userProfil);
            }
            else {
                res.status(404).json({'error': 'user not found'});
            }
        })
        .catch (function (err) {
            res.status(500).json({'error': 'cannot fetch user'});
        })
    }

}