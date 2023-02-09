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

        //we will need to decide what sort of information is being recieved from the user

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