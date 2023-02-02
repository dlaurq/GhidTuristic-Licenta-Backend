const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Location extends Model{}

Location.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false, unique: true},
    adress:{type: DataTypes.STRING}
},{db})


module.exports = Location;