//imports

var models = require('./models');


models.Cars.findAll({}).then((result) =>{
  console.log(result);
})
.catch(err => console.log(err));