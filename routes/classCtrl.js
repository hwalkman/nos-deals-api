// imports

var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');



module.exports = ({
    newClass: ((req, res) => {
        // Authentification

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

        if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Class.create({
            userId: userId,
            name: req.body.name,
            city: req.body.city,
            district: req.body.district,
            price: req.body.price,
            description: req.body.description
        })
        .then((classes) => {
            if(classes) res.status(200).json({'id':classes.id});
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({'err': "can't create user's class "});
                console.log(err);
            }    
        })
        
    }),

    getClasses: ((req, res) => {
         // Authentification

         var headerAutho = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAutho);
 
         if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
         }

         models.Class.findAll({
            where: {userId: userId}
         })
         .then((classes) => {
             if(classes) res.status(200).json({'classes': classes})
         })
         .catch((err) => {
             if(err){
                res.status(500).json({'err': "can't get user's classes"});
                console.log(err);
             }
             
         })
    })
})