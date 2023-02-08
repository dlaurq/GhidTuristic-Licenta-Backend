const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class PlacesVisited extends Model{}

PlacesVisited.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
},{sequelize:db, freezeTableName:true})


module.exports = PlacesVisited;