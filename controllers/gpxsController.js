const Gpx = require('../models/Gpx')
const path = require('path');

const getGpx = async (req, res, next) => {
    const id = req.params.id

    const options = {
        root: path.join(__dirname, '../uploads'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
    }

    if(!id) return res.status(400).json({message: 'id null'})

    const gpx = await Gpx.findOne({where: {id: id}})

    res.status(200).sendFile(gpx.url, options, (err) => {
        if(err) next(err)
        else console.log('sent', gpx.url)
    })
}

module.exports = {getGpx}