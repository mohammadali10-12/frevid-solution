const { Router } = require('express/lib/application')
const express = require('express');


const routers = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
routers.use(cookieParser());

const jwt = require('jsonwebtoken');


const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');
const User = require('../db/model/contact');
const ourWork = require('../db/model/ourwork');
const SignUp = require('../db/model/sign-up');
const auth = require('../db/middleware/auth');

// const async = require('hbs/lib/async');



// all routes

routers.get('/', async (req, resp) => {
    const services = await Service.find({})

    resp.render('index', {
        services: services,

    })
})

routers.get('/about', auth, (req, resp) => {

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

//admin router 

routers.get('/admin', (req, resp) => {
    resp.render('admin');
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

            const token = await signUpData.genrateToken();

            resp.cookie('jwt', token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: false,
            });

            const register = await signUpData.save();

            resp.status(201).redirect('/login');
        }


    } catch (error) {
        resp.status(400).send(error)
    }
})

//login router

routers.get('/login', (req, resp) => {
    resp.render('login')
})

routers.post('/login', async (req, resp) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const adminEmail = 'admin@gmail.com';



        const userDetail = await SignUp.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userDetail.password);

        const token = await userDetail.genrateToken();


        resp.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000000),
            httpOnly: false,
        });


        if (adminEmail === email) {
            resp.status(200);
            resp.redirect('/admin');
        }
        if (isMatch) {

            resp.status(200).redirect('/');
        } else {
            resp.status(400).render('login', { error: 'wrong login detail' });
        }

    } catch (error) {
        resp.status(400).render('login', { error: 'wrong login detail' });
    }
})


//log-out router

routers.get('/logout', auth, async (req, resp) => {
    try {

        resp.clearCookie('jwt');
        console.log('logout successfully');
        await req.user.save();
        resp.render('login');


    } catch (error) {

        resp.status(500).send(error);
    }
})


routers.post('/form-submit', async (req, resp) => {
    try {

        const { name, email, number, message, services } = req.body;
        const contact = new User({ name, email, number, message, services });


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



//when user login after navbar in show logout and remove login in node js and express js with handelbar and cookies?
