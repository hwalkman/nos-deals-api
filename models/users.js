'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Users.hasMany(models.Vehicles);
      models.Users.hasMany(models.Properties);
      models.Users.hasMany(models.Class);
      models.Users.hasMany(models.Prestations);
      models.Users.hasMany(models.Events);



    }
  };
  Users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};