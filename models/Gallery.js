const { Schema, model } = require('mongoose');

const gallerySchema = new Schema({
    imageUrl: {type: String, unique: true},
    type: {type: Number}
})

module.exports = model('Gallery', gallerySchema)