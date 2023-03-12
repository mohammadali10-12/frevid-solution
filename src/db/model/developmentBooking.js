const mongoose = require('mongoose');

const developmentBookingSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    number: { type: Number, require: true },
    budget: { type: String, require: true },
    businesstype: { type: String, require: true },
    Bookingdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DevelopmentBooking', developmentBookingSchema);