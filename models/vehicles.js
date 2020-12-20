'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Vehicles.hasOne(models.Cars);
      models.Vehicles.hasOne(models.Motorbikes);
      
      models.Vehicles.belongsTo(models.Users, {
        foreingkey: {
          allowNull: false,
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      })

    }
  };
  Vehicles.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    mileage: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Vehicles',
  });
  return Vehicles;
};