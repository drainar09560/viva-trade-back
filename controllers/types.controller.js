const Types = require('../models/Types')
const Products = require('../models/Products')
const errorHandler = require('../utils/errorHandler')
const normalize = require('../utils/normalize')

module.exports.getAll = async (req, res) => {
    try{
        const data = await Types.find();
        res.status(200).json(data)
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    try{
        const type = new Types({
            title: normalize(req.body.title)
        });
        await type.save()
        res.status(201).json(type)
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async (req, res) => {
    try{
        await Types.remove({_id: req.query.id});
        await Products.remove({type: req.query.id})
        res.status(200).json({message: 'Тип был удалён'})
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.update = async (req, res) => {
    try{
        const type = await Types.findOneAndUpdate(
            {_id: req.query.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(type)
    } catch(e) {
        errorHandler(res, e)
    }
}