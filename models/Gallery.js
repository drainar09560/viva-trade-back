const { Schema, model } = require('mongoose');

const gallerySchema = new Schema({
    imageUrl: {type: String, require: true},
    description: {type: String, require: true}
})

module.exports = model('Gallery', gallerySchema)