const express = require('express')

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_IP } = require('./config/config');






//Database
const db = require('./config/database')

//DB test
try {
  db.authenticate();
  console.log('Connected to the DB');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!!as!s')
})



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

