const { Schema, Types, model} = require('mongoose');

const schema = new Schema({
    manufacture: {type: Types.ObjectId, ref: 'Manufactured', required: true},
    title: {type: String, required: true},
    type: {type: Types.ObjectId, ref: 'Types'},
    description: {type: String},
    price: {type: Number, required: true},
    imageUrl: {type: String, unique: true, default: ''},
    favorite: {type: Boolean, default: false}
})

module.exports = model('Product', schema)