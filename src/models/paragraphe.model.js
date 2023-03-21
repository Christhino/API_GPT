const mongoose = require('mongoose');

const paragrapheSchema = new mongoose.Schema({
    sujet: {
        required: false,
        type: String
    },
    keywords: {
        required: true,
        type: String
    }, 
    tonalite: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('paragraphe', paragrapheSchema)