const mongoose = require('mongoose');

const traductionSchema = new mongoose.Schema({
    body: {
        required: false,
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('traduction', traductionSchema)