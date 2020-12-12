const { Schema, model } = require('mongoose');

const typeSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

module.exports = model('Types', typeSchema)