const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Category extends Model{}

Category.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false, unique: true}
},{sequelize:db})

module.exports = Category;