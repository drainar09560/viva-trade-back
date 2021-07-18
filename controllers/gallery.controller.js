const Gallery = require('../models/Gallery');
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
    try{
        const images = await Gallery.find()
        res.status(200).json(images)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async (req, res) => {
    try{
        const image = new Gallery({
            imageUrl: req.file ? req.file.path : '',
            description: req.body.description
        })

        await image.save()
        res.status(201).json(image)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.delete = async (req, res) => {
    try{
        await Gallery.remove({_id: req.query.id})
        res.status(200).json({message: 'Фотография удалена.'})
    } catch (e) {
        errorHandler(res, e)
    }
}