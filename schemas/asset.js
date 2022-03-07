const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    model: {
        type: String,
        required: true
    },

    owner: {
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true
    },

    health_level: {
        type: Number,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    price: {
        type: Number,
        required: false
    },

    unitId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Asset', AssetSchema);