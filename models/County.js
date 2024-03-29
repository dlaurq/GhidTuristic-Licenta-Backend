const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class County extends Model{}

County.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false}
},{sequelize:db})


module.exports = County;