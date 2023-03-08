require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const db = require('./config/database')
const {errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
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
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/auth'))
app.use('/api/countries', require('./routes/api/countryRoutes'))
app.use('/api/counties', require('./routes/api/countyRoutes'))
app.use('/api/cities', require('./routes/api/cityRoutes'))
app.use('/api/locations', require('./routes/api/locationRoutes'))


app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

