const Products = require('../models/Products')
const Gallery = require('../models/Gallery')
const Types = require('../models/Types')
const Manufactured = require('../models/Manufactured')
const errorHandler = require('../utils/errorHandler')
const normalize = require('../utils/normalize')

module.exports.getByParams = async (req, res) => {
    try{
        const types = await Types.find()
        const manufactured = await Manufactured.find()

        if(req.body.favorite) {
            const query = {}
            if (req.body.type) {
                query.type = req.body.type
            }
            const gallery = await Gallery.find(query).limit(12)
            const products = await Products.find({favorite: true}).limit(12)
        
            res.status(200).json({filters: {types, manufactured}, products: {items: products}, gallery})
        } else{
            const query = {}
            if (req.body.manufactured) {
                query.manufacture = { $in : req.body.manufactured}
            }
            if (req.body.type) {
                query.type = req.body.type
            }

            const {page=1, limit=16} = req.body
            const count = await Products.countDocuments(query)
            const products = await Products.find(query).limit(limit*1).skip((page-1) * limit);
            res.status(200).json({filters: {types, manufactured}, products: {items: products, count}})
        }
        
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    const product = new Products({
        manufacture: req.body.manufacture,
        title: normalize(req.body.title),
        type: req.body.type,
        description: normalize(req.body.description),
        price: req.body.price,
        imageUrl: req.file ? req.file.path : '',
        favorite: req.body.favorite
    });
    try{
        await product.save()
        res.status(201).json(product)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.update = async (req, res) => {
    const updated = {...req.body};
    if(req.file) {
        updated.imageUrl = req.file.path
    }
    try{
        const product = await Products.findOneAndUpdate(
            {_id: req.query.id},
            {$set: updated},
            {new: true})
        res.status(200).json({massage: 'Товар был обновлён.'})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async (req, res) => {
    try{
        await Products.remove({_id: req.query.id})
        res.status(200).json({message: 'Товар был удалён.'})
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getDataByAdmin = async (res, req) => {
    try{
        const query = {}
            if (req.body.manufactured) {
                query.manufacture = { $in : req.body.manufactured}
            }
            if (req.body.type) {
                query.type = req.body.type
            }

            const {page=1, limit=16} = req.body

            const types = await Types.find()
            const manufactured = await Manufactured.find()
            const count = await Products.countDocuments(query)
            const products = await Products.find(query).limit(limit*1).skip((page-1) * limit);
            res.status(200).json({filters: {types, manufactured}, products: {items: products, count}})
    } catch (e) {
        errorHandler(res, e)
    }
}