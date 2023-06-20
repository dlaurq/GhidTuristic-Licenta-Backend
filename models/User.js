const {DataTypes, Model, BOOLEAN} = require('sequelize');
const db = require('../config/database')

class User extends Model{
    getUserRoles(){
        return this.getRoles()
    }
}

User.init({
    id: {type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull:false, unique:true,validate:{isAlphanumeric:true,min:4, max:16}},
    firstName: {type: DataTypes.STRING, validate:{isAlpha:true,min:4}},
    lastName: {type: DataTypes.STRING,validate:{isAlpha:true,min:4}},
    password: {type: DataTypes.TEXT, allowNull: false,validate:{min:8}},
    email: {type: DataTypes.STRING},
    phoneNr: {type: DataTypes.STRING},
    bio: {type: DataTypes.STRING},
    refreshToken: {type: DataTypes.STRING}
},{sequelize:db})

module.exports = User;