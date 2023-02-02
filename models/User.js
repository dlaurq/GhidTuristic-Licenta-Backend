const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class User extends Model{}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    phoneNr: {type: DataTypes.STRING},
    bio: {type: DataTypes.STRING},
},{db})


module.exports = User;