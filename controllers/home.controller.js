const Product = require('../models/Products')
const errorHandler = require('../utils/errorHandler')

module.exports.getFavorite = async (req, res) => {
    try{
        const data = await Product.find({favorite: true});
        res.status(200).json(data)
    } catch (e) {
        errorHandler(res, e)
    }
}