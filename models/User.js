const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class User extends Model{}

User.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    username: {type: DataTypes.STRING(16), allowNull:false, unique:true,validate:{isAlphanumeric:true,min:4, max:16}},
    firstName: {type: DataTypes.STRING, validate:{isAlpha:true,min:4}},
    lastName: {type: DataTypes.STRING,validate:{isAlpha:true,min:4}},
    password: {type: DataTypes.TEXT, allowNull: false,validate:{min:8}},
    email: {type: DataTypes.STRING, allowNull: false,validate:{isEmail:true}},
    phoneNr: {type: DataTypes.STRING,validate:{isNumeric:true}},
    bio: {type: DataTypes.STRING,validate:{isAlphanumeric:true}},
},{sequelize:db})

module.exports = User;