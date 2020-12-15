const Product = require('../models/Products')
const Gallery = require('../models/Gallery')
const errorHandler = require('../utils/errorHandler')

module.exports.getFavorite = async (req, res) => {
    try{
        const products = await Product.find({favorite: true});
        const gallery = await Gallery.find();
        res.status(200).json({products, gallery})
    } catch (e) {
        errorHandler(res, e)
    }
}