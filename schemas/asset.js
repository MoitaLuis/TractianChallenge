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
        required: true,
        enum: ['Running', 'Alerting', 'Stopped']
    },

    health_level: {
        type: Number,
        required: true,
        min: [0, 'Invalid health level'],
        max: [100, 'Invalid health level']
    },

    image: {
        data: Buffer,
        contentType: String
    },

    unitId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Asset', AssetSchema);