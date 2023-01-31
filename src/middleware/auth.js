const jwt = require('jsonwebtoken');

const SignUp = require('../db/model/sign-up');

const auth = async (req, resp, next) => {
  
    // console.log(req.cookies.jwt);
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        const user = await SignUp.findOne({ _id: verifyUser._id });
        console.log(user);

        next();
    } catch (error) {
        resp.status(400).send(error)
        console.log('this is error part ');

    }
}


module.exports = auth;