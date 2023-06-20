const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Review extends Model{}

Review.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING(500)},
    rating: {type: DataTypes.FLOAT},
    isActive:{type: DataTypes.BOOLEAN, allowNull: false}
},{sequelize:db})


module.exports = Review;