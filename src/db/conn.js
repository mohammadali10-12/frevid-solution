const mongoose = require('mongoose');
const Demo = require('./model/Demo')


const uri = 'mongodb://localhost:27017/demo_db';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose.set('strictQuery', true);
const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {

    Demo.create([
      {

        name: 'mohammad',
        number: 9265533892,
        address: 'vaghrol'
      },
    ]);


    if (err) console.error(err);
    else console.log("database connection")
  })
}

connectWithDB();