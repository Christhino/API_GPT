const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    stripeId: { type: String, required: true, unique: true }
},{ timestamps: true });

module.exports = mongoose.model('Client', clientSchema);
