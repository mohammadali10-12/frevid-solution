const mongoose = require('mongoose')

const developmentSchema = mongoose.Schema({

    imgUrl:String,
    title:String,
    subTitle:String
})

module.exports = mongoose.model('development',developmentSchema);