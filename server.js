require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const db = require('./config/database')
const {errorHandler} = require('./middleware/errorMiddleware')
//Routes
//const usersRoutes = require('./routes/api/usersRoutes')
//const authRoutes = require('./routes/api/authRoutes')
//const {absRouter:countyRoutes} = require('./routes/api/countyRoutes')
//const reviewRoutes = require('./routes/api/reviewRoutes')

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


app.get('/', (req, res) => {res.send('Hello World!!as!s')})
app.use(cors({origin:['http://localhost:5173']}))
app.use(express.json())

//app.use('/api/users', usersRoutes)
//app.use('/api/auth', authRoutes)
app.use('/api/countries', require('./routes/api/countryRoutes'))
app.use('/api/counties', require('./routes/api/countyRoutes'))
app.use('/api/cities', require('./routes/api/cityRoutes'))
//app.use('/api/review', reviewRoutes)
//app.use('/api/city', require('./routes/api/cityRoutes'))

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

