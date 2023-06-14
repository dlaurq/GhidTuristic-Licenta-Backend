const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class ListaEntitati extends Model{}

ListaEntitati.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    data: {type: DataTypes.DATEONLY}
},{sequelize:db, freezeTableName:true})


module.exports = ListaEntitati;