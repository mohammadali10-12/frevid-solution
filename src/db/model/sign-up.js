
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const signUpSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    creatAt: { type: Date, default: Date.now },
    isActive: { type: Boolean },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
    },
    tokens: [{
        token: { type: String, require: true, default: '' }
    }],

});



signUpSchema.methods.genrateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        resp.send('the error' + error);
    }
}

signUpSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        console.log('pre password' + this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log('pre password' + this.password);
    }
    next();
})

const SignUp = new mongoose.model('Signup', signUpSchema);

module.exports = SignUp;






