require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const db = require('./config/database')
const {errorHandler} = require('./middleware/errorMiddleware')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')


//Routes
//const usersRoutes = require('./routes/api/usersRoutes')
//const authRoutes = require('./routes/api/authRoutes')
//const {absRouter:countyRoutes} = require('./routes/api/countyRoutes')
//const reviewRoutes = require('./routes/api/reviewRoutes')

//DB test

const fs = require('fs')
const dir ='./uploads'

if(!fs.existsSync(dir))
  fs.mkdirSync(dir)

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
app.use(credentials);
app.use(cors(corsOptions));


const multer = require('multer')
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, './uploads')
    },
  
    filename: (req, file, cb) => {
      //console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  
const upload = multer({storage: storage})

app.get('/', (req, res) => {res.send('Hello World!!as!s')})

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('uploads'))


app.use('/auth', require('./routes/auth'))
app.use('/recomandari', require('./routes/recomandariRoutes'))
app.use('/gpxs', require('./routes/gpxsRoutes'))

//app.use(upload.single('gpxs'))
//DE MUTAT LA RUTE PROTECTED CAND E GATA
app.use('/api/geo' , require('./routes/api/geoRounter'))
app.use('/api/countries', require('./routes/api/countryRoutes'))
app.use('/api/counties', require('./routes/api/countyRoutes'))
app.use('/api/cities', require('./routes/api/cityRoutes'))
app.use('/api/locations', require('./routes/api/locationRoutes'))
app.use('/api/places',upload.fields([{name: 'gpxs'},{name: 'imgs'}]), require('./routes/api/placeRoutes'))
app.use('/api/reviews', upload.array('imgs'), require('./routes/api/reviewRoutes'))
app.use('/api/users', require('./routes/api/usersRoutes'))
app.use('/api/categories', require('./routes/api/categoryRoutes'))
app.use('/api/visited', require('./routes/api/visitedRoutes'))
app.use('/api/toVisit', require('./routes/api/toVisitRoutes'))


//Protected routes
//app.use(verifyJWT)



app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

