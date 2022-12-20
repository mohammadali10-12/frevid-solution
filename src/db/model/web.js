const mongoose = require('mongoose');


const webSchema = mongoose.Schema({

    imgUrl_1:String,
    subTitle_1:String,
    title_2:String,
    imgUrl_2:String,
    subTitle_2:String,
    text:String

    
})

module.exports= mongoose.model('web',webSchema);