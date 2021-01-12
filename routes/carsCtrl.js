// imports

var jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const sequelize = require('sequelize');



module.exports = {

    newCars: (req, res) => {
         // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

       if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }
        if(req.body.category != 'car') {
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
            console.log("nbPlace : "+req.body.nbPlace+" gearbox : "+req.body.gearbox);
            models.Cars.create({
                vehicleId: vehicle.id,
                nbPlace: req.body.nbPlace,
                gearbox: req.body.gearbox
            })
            .then((car) => {
                res.status(200).json({
                    'id': car.id
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
    getCars: ((req, res) => {
        // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);
 
        if(userId == -1) {
            return res.status(400).json({'error' : 'wrong token or token invalid'});
        }
       

        models.Vehicles.findAll({
            attributes:["name", "category", "price", "description","color", "brand","model","createdAt"],
            where: {
                userId : userId,
                category: 'car'
            },
            include: [{
                model: models.Cars,
                attributes: ["nbPlace", "gearbox"],
                where: {
                    vehicleId: sequelize.col('Vehicles.id'),
                },
                required: false
            }]
        })
        .then((cars) => {
            if(cars) res.status(200).json(cars)
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                'car err': " can't get user's cars",
                'error': err
            })
        })
    })
}