const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Place extends Model{}

Place.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    isActive: {type:DataTypes.BOOLEAN, allowNull:false},
    lat: {type: DataTypes.FLOAT}, 
    lng: {type: DataTypes.FLOAT}, 
},{sequelize:db})


module.exports = Place;