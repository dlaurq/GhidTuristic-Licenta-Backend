const express = require('express')
const db = require('./config/database')
const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/authRoutes')
//DB test
try {
  db.authenticate();
  console.log('Connected to the DB');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const dbConfig = require('./config/dbConfig')
dbConfig()

//app
const app = express()


app.get('/', (req, res) => {
  res.send('Hello World!!as!s')
})
app.use(express.json())
app.use('/api/users', usersRoutes)
app.use('/', authRoutes)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

