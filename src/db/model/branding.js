const mongoose = require('mongoose');

const brandingSchema = mongoose.Schema({

    imgUrl:String,
    title:String,
    subTitle:String

})

module.exports = mongoose.model('branding',brandingSchema);