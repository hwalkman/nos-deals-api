'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) { 

      models.Properties.belongsTo(models.Users, {
        foreignkey: {
          allowNull: false
        }
      })
    }
  };
  Properties.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    area: DataTypes.DOUBLE,
    nbPiece: DataTypes.INTEGER,
    furnished: DataTypes.BOOLEAN,
    city: DataTypes.STRING,
    district: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Properties',
  });
  return Properties;
};