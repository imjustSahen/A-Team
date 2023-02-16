const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    //checking to make sure that the hashed user password matches the user entered password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
          beforeCreate: async (newUserData) => {
            //taking the user's email address, and making all letters lower case before adding it to the database.
            newUserData.email = await newUserData.email.toLowerCase();
            return newUserData;
          },
            //make all of the characters lower case in an updated email address, before updating the database.
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.email = await updatedUserData.email.toLowerCase();
            return updatedUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
);

module.exports = User ;