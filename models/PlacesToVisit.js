const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class PlacesToVisit extends Model{}

PlacesToVisit.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
},{sequelize:db, freezeTableName:true})


module.exports = PlacesToVisit;