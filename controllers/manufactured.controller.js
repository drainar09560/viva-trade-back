const Manufactured = require('../models/Manufactured')
const Products = require('../models/Products')
const errorHandler = require('../utils/errorHandler')
const normalize = require('../utils/normalize')

module.exports.getAll = async (req, res) => {
    try{
        const data = await Manufactured.find();
        res.status(200).json(data)
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    try{
        const manuf = new Manufactured({
            title: normalize(req.body.title)
        });
        await manuf.save()
        res.status(201).json(manuf)
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async (req, res) => {
    try{
        await Manufactured.remove({_id: req.query.id});
        await Products.remove({manufacture: req.query.id})
        res.status(200).json({message: 'Производитель был удалён'})
    } catch(e) {
        errorHandler(res, e)
    }
}
module.exports.update = async (req, res) => {
    try{
        const manuf = await Manufactured.findOneAndUpdate(
            {_id: req.query.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(manuf)
    } catch(e) {
        errorHandler(res, e)
    }
}