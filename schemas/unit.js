const mongoose = require('mongoose');

const UnitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    adress: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
    
    companyId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Post', UnitSchema);