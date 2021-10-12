const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    token: [{
        type: String,
        required: true
    }],
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});
module.exports  =Token   = mongoose.model('token', TokenSchema);