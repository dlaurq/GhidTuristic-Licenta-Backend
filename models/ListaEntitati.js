const {DataTypes, Model} = require('sequelize');
const db = require('../config/database');


class ListaEntitati extends Model{}

ListaEntitati.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    done: {type: DataTypes.BOOLEAN, defaultValue: false}
},{sequelize:db, freezeTableName:false})


module.exports = ListaEntitati;