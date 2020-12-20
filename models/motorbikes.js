'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Motorbikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.Motorbikes.belongsTo(models.Vehicles, {
        foreignkey: {
          allowNull: false
        }
      })
    }
  };
  Motorbikes.init({
    vehicleId: DataTypes.INTEGER,
    cylinder: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Motorbikes',
  });
  return Motorbikes;
};