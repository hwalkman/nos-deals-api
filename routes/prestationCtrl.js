// imports

var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');



module.exports = ({
    newPrestation: ((req, res) => {
        // Authentification

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

        if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Prestations.create({
            userId: userId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })
        .then((prestations) => {
            if(event) res.status(200).json(prestations[0])
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({'err': "can't create user's prestation "});
                console.log(err);
            }    
        })
        
    }),

    getPrestation: ((req, res) => {
         // Authentification

         var headerAutho = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAutho);
 
         if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
         }

         models.Prestations.findAll({
            where: {userId: userId}
         })
         .then((prestations) => {
             if(prestations) res.status(200).json(prestations)
         })
         .catch((err) => {
             if(err){
                res.status(500).json({'err': "can't get user's prestations"});
                console.log(err);
             }
             
         })
    })
})