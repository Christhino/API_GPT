const mongoose = require('mongoose');

const motivationSchema = new mongoose.Schema({
    title: {
        required: false,
        type: String
    },
    nom: {
        required: false,
        type: String
    },
    prenom: {
        required: false,
        type: String
    },
    body: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('Motivation', motivationSchema)