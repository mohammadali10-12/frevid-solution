const mongoose = require('mongoose');
const Web = require('./model/web');
const Branding = require('./model/branding');
const Development = require('./model/development');
const Service = require('../db/model/service');
const OurWork = require('./model/ourwork');

const uri = 'mongodb://localhost:27017/Frevid_DB';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6


  // stale: false,
  // compatible: true,
  // heartbeatFrequencyMS: 10000,
  // localThresholdMS: 15,
  // setName: null,
  // maxElectionId: null,
  // maxSetVersion: null,
  // commonWireVersion: 0,
  // logicalSessionTimeoutMinutes: null
}


mongoose.set('strictQuery', true);
const connectWithDB = () => {
  mongoose.connect(uri, options, (err, db) => {




    if (err) console.error(err);
    else console.log("database connection")
  })
}

connectWithDB();