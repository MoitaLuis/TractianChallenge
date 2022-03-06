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
        type: int,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    price: {
        type: int,
        required: false
    },

    unitId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Asset', AssetSchema);