
const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creatAt: { type: Date, default: Date.now },
    isActive: { type: Boolean }
});

module.exports = mongoose.model('Signup', signUpSchema);