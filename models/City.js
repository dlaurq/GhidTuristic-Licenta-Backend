const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class City extends Model{}

City.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
},{sequelize:db})


module.exports = City;