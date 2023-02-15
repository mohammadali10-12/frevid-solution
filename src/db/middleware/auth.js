const async = require('hbs/lib/async');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SignUp = require('../model/sign-up');


const auth = async (req, resp, next) => {
    try {
        const token = req.cookies.jwt;

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await SignUp.findOne({ _id: verifyUser._id })
        // console.log(user);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        resp.status(400).redirect('/login')
    }
}

module.exports = auth;


