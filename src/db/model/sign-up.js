
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const signUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creatAt: { type: Date, default: Date.now },
    isActive: { type: Boolean },
    tokens: [{
        token: { type: String, require: true }
    }]
});

signUpSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
});

signUpSchema.methods.genrateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, 'tyudifjhjkzxciuhsjkdfjdkszxmnchdjskcnfhjdmcn');
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        resp.send('the error' + error);
    }
}



module.exports = mongoose.model('Signup', signUpSchema);








