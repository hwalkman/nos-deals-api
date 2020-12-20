// imports

var models = require('../models');
var jwtUtils = require('../utils/jwt.utils');



module.exports = ({
    newProperty: ((req, res) => {
        // Authentification

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

        if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Properties.create({
            userId: userId,
            name: req.body.name,
            type: req.body.type,
            area: req.body.area,
            nbPiece: req.body.nbPiece,
            furnished: req.body.furnished,
            city: req.body.city,
            district: req.body.district,
            price: req.body.price,
            description: req.body.description
        })
        .then((property) => {
            if(property) res.status(200).json({'id':property.id});
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({'err': "can't create user's bien "});
                console.log(err);
            }    
        })
        
    }),

    getProperties: ((req, res) => {
         // Authentification

         var headerAutho = req.headers['authorization'];
         var userId = jwtUtils.getUserId(headerAutho);
 
         if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
         }

         models.Properties.findAll({
            where: {userId: userId},
            include:[{
                model: models.Users,
                required: false
            }]
         })
         .then((property) => {
             if(property) res.status(200).json({'biens': property})
         })
         .catch((err) => {
             if(err){
                res.status(500).json({'err': "can't get user's biens"});
                console.log(err);
             }
             
         })
    })
})