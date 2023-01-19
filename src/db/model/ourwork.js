const mongoose = require('mongoose');

const ourWorkSchema = mongoose.Schema({

    imgUrl: String,
    title: String,
    siteLink: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('ourWork',ourWorkSchema);