const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Location extends Model{}

Location.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    address:{type: DataTypes.STRING, allowNull: false},
    geoLocaton:{type: DataTypes.STRING}
},{sequelize:db})



module.exports = Location;