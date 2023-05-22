const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class PlacesVisited extends Model{}

PlacesVisited.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
},{sequelize:db, freezeTableName:true})


module.exports = PlacesVisited;