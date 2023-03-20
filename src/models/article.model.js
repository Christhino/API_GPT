const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        required: false,
        type: String
    },
    body: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('article', articleSchema)