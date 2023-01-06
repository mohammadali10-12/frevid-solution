const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    number: {
        type: Number,
        require: true,
        unique: true
    },
    services: {
        type: String,
        require: true
    },
    message: {
        type: String,

    }
})

module.exports = mongoose.model('userdetail',contactSchema);