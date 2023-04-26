const Sequelize = require('sequelize');
const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_IP } = require('./config');
const mysql = require('mysql2');

const DB_NAME = 'Licenta'
//MYSQL conn
const connection = mysql.createConnection({
    host: MYSQL_IP,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
  });

//CREATE DB
connection.query(
`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`,
(err,res) =>{
    console.log(res);
    console.log(err);
});
connection.end();

//DB connaction
const sequelize = new Sequelize('Licenta', MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_IP,
    dialect: 'mysql',
    define: {
        freezTableName: true
    }
  });

sequelize.options.logging = false

module.exports = sequelize;

