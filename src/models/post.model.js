const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        required: false,
        type: String
    },
    body: {
        required: true,
        type: String
    }, 
    
    keywords:{
        type: String,  
    },

}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)