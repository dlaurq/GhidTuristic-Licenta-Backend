const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');

class UsersPlacesReviews extends Model{}

UsersPlacesReviews.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
},{sequelize:db})


module.exports = UsersPlacesReviews;