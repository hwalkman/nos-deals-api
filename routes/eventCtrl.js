// imports

var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');



module.exports = ({
    newEvent: ((req, res) => {
        // Authentification

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

        if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Events.create({
            userId: userId,
            name: req.body.name,
            city: req.body.city,
            district: req.body.district,
            price: req.body.price,
            description: req.body.description
        })
        .then((event) => {
            if(event) res.status(200).json({'id':event.id});
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({'err': "can't create user's event "});
                console.log(err);
            }    
        })
        
    }),

    getEvent: ((req, res) => {
         // Authentification

         var headerAutho = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAutho);
        
         if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
         }

         models.Events.findAll({
            where: {userId: userId}
         })
         .then((events) => {
             if(events) res.status(200).json(events)
         })
         .catch((err) => {
             if(err){
                res.status(500).json({'err': "can't get user's events"});
                console.log(err);
             }
             
         })
    })
})