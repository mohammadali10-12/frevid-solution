const mongoose = require('mongoose');
const Web = require('./model/web');


const uri = 'mongodb://localhost:27017/Frevid_DB';

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

    // Web.create([
    //   {
    //     imgUrl_1: "/static/images/web.webp",
    //     subTitle_1: "Any business who is about to start, needs to get their online presence taken care of. This is achieved by having a website in place. Todays market demands a highly interactive website and not just a bunch of pages put together but a complete solution, in itself.",
    //     title_2: "We Offer Website Design Services",
    //     imgUrl_2: "/static/images/web-1.webp",
    //     subTitle_2: "Custom Website Design",
    //     text: "Are you looking for a web design that is creative, simple, and attractive to your customers? Then Frevid solution just what you need."
    //   }
    // ])


    if (err) console.error(err);
    else console.log("database connection")
  })
}

connectWithDB();