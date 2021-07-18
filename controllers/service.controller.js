const Services = require('../models/Services')
const errorHandler = require('../utils/errorHandler')
const normalize = require('../utils/normalize')

module.exports.getAll = async (req, res) => {
    try{
        const services = await Services.find()
        res.status(200).json(services)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    const service = new Services({
        title: normalize(req.body.title),
        description: normalize(req.body.description),
        imageUrl: req.file ? req.file.path : '',
    });
    try{
        await service.save()
        res.status(201).json(service)
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
        const service = await Services.findOneAndUpdate(
            {_id: req.query.id},
            {$set: updated},
            {new: true})
        res.status(200).json(service)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async (req, res) => {
    try{
        await Services.remove({_id: req.query.id})
        res.status(200).json({message: 'Услуга была удалена.'})
    } catch (e) {
        errorHandler(res, e)
    }
}
