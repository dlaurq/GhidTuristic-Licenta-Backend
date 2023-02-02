const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class UserReviews extends Model{}

UserReviews.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
},{db, freezeTableName:true})

module.exports = UserReviews;