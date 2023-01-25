const { Router } = require('express/lib/application')
const express = require('express')

const routers = express.Router()

const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');
const User = require('../db/model/contact');
const ourWork = require('../db/model/ourwork');
const signUp = require('../db/model/sign-up');



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
    resp.render('sign-up')
})

routers.post('/sign-up', async (req, resp) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {

            const signUpData = new signUp({
                name: req.body.name,
                email: req.body.email,
                password: password,
                cpassword: cpassword
            })
            const register = await signUpData.save();
            resp.status(201).redirect('/login');

        } else {
            resp.json('password are not matching')
        }


    } catch (error) {
        resp.status(400).send(error)
    }
})

routers.get('/login', (req, resp) => {
    resp.render('login')
})

routers.post('/login', async (req,resp)=>{
try {

const email=req.body.email;
const password=req.body.password;

 const userdetail=await signUp.findOne({email:email});

if(userdetail.password===password){
resp.status(201).redirect('/')   
}else{
resp.status(400).send('login detail is wrong');
}
    
} catch (error) {
resp.status(400).send(error);
}
})

routers.post('/form-submit', async (req, resp) => {
    try {

        const contact = new User({
            name: req.body.name,
            email: req.body.email,
            number: req.body.number,
            message: req.body.message,
            services: req.body.select

        })
        const data = await contact.save()

        resp.status(201).redirect('/')


    } catch (e) {
        resp.status(500).send(e);
        resp.redirect('/')
    }

})

routers.get('*', (req, resp) => {
    resp.render('error')
})



module.exports = routers

