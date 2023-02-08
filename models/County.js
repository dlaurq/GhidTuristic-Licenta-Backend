const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class County extends Model{}

County.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
},{sequelize:db})


module.exports = County;