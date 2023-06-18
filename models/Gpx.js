const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Gpx extends Model{}

Gpx.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    url: {type: DataTypes.STRING, allowNull: false},
    name:{type: DataTypes.STRING}
},{sequelize:db})


module.exports = Gpx;