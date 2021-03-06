const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Company', CompanySchema);