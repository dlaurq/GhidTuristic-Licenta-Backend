const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Hour extends Model{}

Hour.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    hour: {type: DataTypes.STRING, allowNull: false},
},{db})


module.exports = Hour;