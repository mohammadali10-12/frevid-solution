const mongoose = require('mongoose');

const demoSchema =  mongoose.Schema({

name:{
 
type:String,
required:true

},
number:Number,
address:String

})

 module.exports=  mongoose.model('demo',demoSchema);

//  module.exports=User

// const newUser = new User({
    
//     name:'mohammad',
//     number:9265533892,
//     address:'vaghrol'
// });

//  newUser.save();
//  .then(()=> console.log('data add'));