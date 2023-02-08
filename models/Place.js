const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Place extends Model{}

Place.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
},{sequelize:db})


module.exports = Place;