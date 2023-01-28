const { Router } = require('express/lib/application')
const express = require('express')

const routers = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');
const User = require('../db/model/contact');
const ourWork = require('../db/model/ourwork');
const SignUp = require('../db/model/sign-up');



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
            resp.json('password are not matching')
        } else if (userExist) {
            resp.status(400).json('email is already exist');
        }
        else {
            const signUpData = new SignUp({ name, email, password, cpassword });
            // name: name,
            // email: email,
            // password: password,
            // cpassword: cpassword


            // const token = await signUpData.genrateToken();
            const register = await signUpData.save();
            console.log(register);
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

        const { email, password } = req.body;

        const userDetail = await SignUp.findOne({ email: email });

        const isMatch = await bcrypt.compare(password, userDetail.password);
        console.log(password);
        console.log(userDetail.password);
        // const token = await userdetail.genrateToken();
        if (isMatch) {

            resp.status(201).render('index')
        } else {
            resp.status(400).send('login detail is wrong');
        }

    } catch (error) {
        resp.status(400).send(error);
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

