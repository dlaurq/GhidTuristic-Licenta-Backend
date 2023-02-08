const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Day extends Model{}

Day.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    day: {type: DataTypes.STRING, allowNull: false},
},{sequelize:db})


module.exports = Day;