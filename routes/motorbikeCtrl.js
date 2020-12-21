// imports
var jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const sequelize = require('sequelize');



module.exports = {

    newMotorbike: (req, res) => {
         // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

       if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }
        if(req.body.category != 'motorbike') {
            return res.status(400).json({'error' : 'wrong category ! choose right one'});
        }

        // params
        models.Vehicles.create({
            userId: userId,
            name: req.body.name,
            category: req.body.category,
            brand: req.body.brand,
            model: req.body.model,
            mileage: req.body.mileage,
            color: req.body.color,
            price: req.body.price,
            description: req.body.description
        })
        .then((vehicle) => {
            models.Motorbikes.create({
                vehicleId: vehicle.id,
                cylinder: req.body.cylinder
            })
            .then((motorbike) => {
                res.status(200).json({
                    'id': motorbike.id
                })
            })
            .catch((err) => {
                res.status(500).json({
                    'car error': 'can\'t create new car',
                    'err':err
                })
            })
        })
        .catch((err) =>{
            res.status(500).json({
                'vehicle error': 'can\'t create new vehicle',
                'err':err
            })
        })
    },
    getMotorbikes: ((req, res) => {
        // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);
 
        if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        models.Vehicles.findAll({
            where: {
                userId : userId,
                category: 'motorbike'
            },
            include: [{
                model: models.Motorbikes,
                where: {
                    vehicleId: sequelize.col('Vehicles.id'),
                },
                required: false
            }]
        })
        .then((motorbike) => {
            if(motorbike) res.status(200).json({'motorbikes': motorbike});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                'car err': " can't get user's motorbike",
                'error': err
            })
        })
    })
}