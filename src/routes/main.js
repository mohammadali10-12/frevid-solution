const { Router } = require('express/lib/application')
const express = require('express');
const app = express();

const routers = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// const jwt = require('jsonwebtoken');

const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');
const User = require('../db/model/contact');
const ourWork = require('../db/model/ourwork');
const SignUp = require('../db/model/sign-up');
const auth = require('../middleware/auth');


// all routes

routers.get('/', async (req, resp) => {
    const services = await Service.find({})

    resp.render('index', {
        services: services
    })
})

routers.get('/about', (req, resp) => {

    resp.render('about')
})

routers.get('/service', (req, resp) => {
    resp.render('service')
})

routers.get('/service/web', async (req, resp) => {
    const webs = await Web.find({})

    resp.render('web', {
        webs: webs
    })
})

routers.get('/service/branding', async (req, resp) => {
    const Brandings = await Branding.find({})

    resp.render('branding', {
        Brandings: Brandings
    })
})

routers.get('/service/web-development', async (req, resp) => {

    const Developments = await Development.find({})

    resp.render('web-development', {
        Developments: Developments
    })
})

routers.get('/contact', (req, resp) => {
    resp.render('contact');
})

routers.get('/ourwork', async (req, resp) => {
    const workDetail = await ourWork.find({})
    resp.render('ourwork', {
        ourWork: workDetail
    });
})

routers.get('/sign-up', (req, resp) => {
    resp.render('sign-up');
})

routers.post('/sign-up', async (req, resp) => {
    try {

        const { name, email, password, cpassword } = req.body;

        const userExist = await SignUp.findOne({ email: email })
        if (password != cpassword) {
            resp.render('sign-up', { isNotMatch: 'password are not match' });
        } else if (userExist) {
            resp.status(400).render('sign-up', { exist: 'email is already exist' });
        }
        else {
            const signUpData = new SignUp({ name, email, password, cpassword });
            // name: name,
            // email: email,
            // password: password,
            // cpassword: cpassword


            const token = await signUpData.genrateToken();
            resp.cookie('jwt', token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: true,
            });

            const register = await signUpData.save();

            resp.status(201).redirect('/login');
        }


    } catch (error) {
        resp.status(400).send(error)
    }
})

routers.get('/login', (req, resp) => {
    resp.render('login')
})

routers.post('/login', async (req, resp) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userDetail = await SignUp.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userDetail.password);

        const token = await userDetail.genrateToken();

        resp.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000000),
            httpOnly: true,
        });

    //  console.log(req.cookies.jwt);
        if (isMatch) {
            resp.status(201).redirect('/');
        } else {
            resp.status(400).render('login', { error: 'wrong login detail' });
        }

    } catch (error) {
        resp.status(400).render('login', { error: 'wrong login detail' });
    }
})



routers.post('/form-submit', async (req, resp) => {
    try {

        const { name, email, number, message, services } = req.body;
        const contact = new User({ name, email, number, message, services });
        // name: req.body.name,
        // email: req.body.email,
        // number: req.body.number,
        // message: req.body.message,
        // services: req.body.select

        const data = await contact.save()

        resp.status(201).redirect('/')


    } catch (e) {
        resp.status(500).send(e);

    }

})

routers.get('*', (req, resp) => {
    resp.render('error')
})

module.exports = routers




