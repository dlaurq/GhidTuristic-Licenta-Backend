module.exports = () =>{
    const db = require('./database')
    const models = require('./ModelsConfig')
    const relations = require('./relationship')
    relations()
    db.sync({ alter: true })
}