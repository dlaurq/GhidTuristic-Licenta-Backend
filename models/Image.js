const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Image extends Model{}

Image.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    imgUrl: {type: DataTypes.STRING, allowNull: false},
    isActive:{type: DataTypes.BOOLEAN, allowNull:false}
},{sequelize:db})


module.exports = Image;