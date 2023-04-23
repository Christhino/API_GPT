const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    body: {
        required: true,
        type: String
    }, 


}, { timestamps: true })

module.exports = mongoose.model('chat', chatSchema)