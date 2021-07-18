const Services = require('../models/Services')
const Gallery = require('../models/Gallery')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    try{
        const services = await Services.find();
        const gallery = await Gallery.find();
        res.status(200).json({services, gallery})
    } catch (e) {
        errorHandler(res, e)
    }
}