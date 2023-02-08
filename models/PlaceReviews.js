const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class PlaceReviews extends Model{}

PlaceReviews.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
},{sequelize:db})


module.exports = PlaceReviews;