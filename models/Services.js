const { Schema, Types, model} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, unique: true},
})

module.exports = model('Services', schema)