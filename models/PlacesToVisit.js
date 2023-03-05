const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class PlacesToVisit extends Model{}

PlacesToVisit.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
},{sequelize:db, freezeTableName:true})


module.exports = PlacesToVisit;