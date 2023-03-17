const mongoose = require('mongoose');
const Post = require('../models/post.model')

const responseSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: Post, 
    }, 
    content: {
        required: false,
        type: String
    }, 
}, { timestamps: true })

module.exports = mongoose.model('Response', responseSchema)