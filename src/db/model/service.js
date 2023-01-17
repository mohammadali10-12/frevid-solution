const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    imgUrl:String,
    title:String,
    subTitle:String,
    link:String
})




module.exports = mongoose.model('service',serviceSchema);