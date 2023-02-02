const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class DaySchedules extends Model{}

DaySchedules.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    dayId: {type: DataTypes.INTEGER, references: {model: Day, key: 'id'}},
    placeId: {type: DataTypes.INTEGER, references: {model: Place, key: 'id'}},
    openHourId: {type: DataTypes.INTEGER, references: {model: Hour, key: 'id'}},
    closeHourId: {type: DataTypes.INTEGER, references: {model: Hour, key: 'id'}},
},{db, freezeTableName:true})


module.exports = DaySchedules;