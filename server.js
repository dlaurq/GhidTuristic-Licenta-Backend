const express = require('express')
const db = require('./config/database')
//Routes
const usersRoutes = require('./routes/api/users')
const authRoutes = require('./routes/api/authRoutes')
const countryRoutes = require('./routes/api/countryRoutes')
const {absRouter:countyRoutes} = require('./routes/api/countyRoutes')
const reviewRoutes = require('./routes/api/reviewRoutes')

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
app.use('/api/countries', countryRoutes)
app.use('/api/counties', countyRoutes)
app.use('/api/review', reviewRoutes)



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

