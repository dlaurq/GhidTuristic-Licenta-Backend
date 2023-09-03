const Sequelize = require('sequelize');

//const mysql = require('mysql2');


//MYSQL conn
//const connection = mysql.createConnection(process.env.MYSQL_URL);

//DB connaction
const sequelize = new Sequelize({
    username: process.env.MYSQL_USER, 
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    dialect: 'postgres',
    port: process.env.MYSQL_PORT,
    host: process.env.MYSQL_IP,
    define: {
        freezTableName: true
    }
  });

sequelize.options.logging = false

module.exports = sequelize;

