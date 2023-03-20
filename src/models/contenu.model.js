const mongoose = require('mongoose');

const contenuSchema = new mongoose.Schema({
    title: {
        required: false,
        type: String
    },
    body: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('Contenu', contenuSchema)