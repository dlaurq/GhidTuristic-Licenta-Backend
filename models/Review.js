const {DataTypes, Model} = require('sequelize');
const db = require('../config/database')

class Review extends Model{}

Review.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT, allowNull: false},
    postDate: {type: DataTypes.DATE, allowNull: false},
},{sequelize:db})


module.exports = Review;