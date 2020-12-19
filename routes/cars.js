// imports

var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
const models = require('../models');



module.exports = {

    newCars: (req, res) => {
         // Authentification with token

        var headerAutho = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAutho);

       if(userId == -1) {
           return res.status(400).json({'error' : 'wrong token or token invalid'});
        }

        // params

        var name = (req.body.name == undefined ? undefined:req.body.name);
        var brand = (req.body.brand == undefined ? undefined:req.body.brand);
        var model = (req.body.model == undefined ? undefined:req.body.model);
        var mileage = (req.body.mileage == undefined ? undefined:req.body.mileage);
        var color = (req.body.color == undefined ? undefined:req.body.color);
        var price = (req.body.price == undefined ? undefined:req.body.price);
        var description = (req.body.description == undefined ? undefined:req.body.description);
        var nbPlace = (req.body.nbPlace == undefined ? undefined: req.body.nbPlace);
        var gearbox = (req.body.gearbox == undefined ? undefined: req.body.gearbox);

        models.Vehicles.create({
            userId: userId,
            name: name,
            brand: brand,
            model: model,
            mileage: mileage,
            color: color,
            price: price,
            description: description
        })
        .then((vehicle) => {
            models.Cars.create({
                vehiclesId: vehicle.id,
                nbPlace: nbPlace,
                gearbox: gearbox
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
    }
}