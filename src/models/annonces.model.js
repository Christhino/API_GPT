const mongoose = require('mongoose');

const annoncesSchema = new mongoose.Schema({
    services: {
        required: true,
        type: String
    },
    promotion: {
        required: false,
        type: String
    },
    Ocasion: {
        required: false,
        type: String
    },
    description: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('Annonces', annoncesSchema)