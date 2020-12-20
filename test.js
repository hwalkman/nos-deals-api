//imports

var models = require('./models');


models.Biens.create({
  userId: 1,
  name: "maison à louer nzeng ayong",
  type: "maison",
  area: 100.5,
  nbPlace: 7,
  furnished: 1,
  city: "libreville",
  district: "nzeng ayong",
  description: "disponible immédiatement"
})
.then((bien) => {
  console.log(bien.id);
})
.catch((err) => {
  if (err) {
      console.log(err);
  }    
})