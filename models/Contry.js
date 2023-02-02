const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Country extends Model{}

Country.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
},{db})


module.exports = Country;