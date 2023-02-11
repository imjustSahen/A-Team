const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pairing extends Model {}

Pairing.init(
    {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        beer_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        dish_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'user',
              key: 'id'
          }
        }
      },
      {
          sequelize,
          timestamps: false,
          // Prevent sequelize from renaming the table
          freezeTableName: true,
          underscored: true,
          modelName: 'pairing'
      }
)

module.exports = Pairing ;