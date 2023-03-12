const { Router } = require('express/lib/application')
const express = require('express');


const routers = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
routers.use(cookieParser());


const jwt = require('jsonwebtoken');
const session = require('express-session');
routers.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false,
}));

const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');
const User = require('../db/model/contact');
const ourWork = require('../../views/ourwork');
const SignUp = require('../db/model/sign-up');
const auth = require('../db/middleware/auth');
const async = require('hbs/lib/async');

// all routes
routers.get('/', async (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    const services = await Service.find({});
    const getUser = await SignUp.find();

    return resp.render('index', {
        isLoggedIn,
        services: services,
        getUserData: getUser
    })

})

routers.get('/about', (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    return resp.render('about', { isLoggedIn })
})
// routers.get('/brandingbooking', (req, resp) => {
//     const isLoggedIn = req.session.isLoggedIn || false;

//     return resp.render('/brandingbooking', { isLoggedIn })
// })

routers.get('/service', (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    return resp.render('service', { isLoggedIn })
})

routers.get('/service/web', async (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    const webs = await Web.find({})

    return resp.render('web', {
        isLoggedIn,
        webs: webs
    })
})

routers.get('/service/branding', async (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    const Brandings = await Branding.find({})

    return resp.render('branding', {
        isLoggedIn,
        Brandings: Brandings
    })
})

routers.get('/service/web-development', async (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    const Developments = await Development.find({})

    return resp.render('web-development', {
        isLoggedIn,
        Developments: Developments
    })
})

routers.get('/contact', (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;

    return resp.render('contact', { isLoggedIn });
})

routers.get('/ourwork', async (req, resp) => {

    const isLoggedIn = req.session.isLoggedIn || false;

    const workDetail = await ourWork.find({})
    return resp.render('ourwork', {
        isLoggedIn,
        ourWork: workDetail,
    });

})

//admin router 
routers.get('/admin', auth, (req, resp) => {
    return resp.render('admin');
})

routers.get('/user', async (req, resp) => {

    const detail = await SignUp.find();
    return resp.render('user', {
        users: detail
    });
})

//admin ourwork router
routers.get('/adminOurwork', async (req, resp) => {

    const ourwork = await ourWork.find();
    return resp.render('adminOurwork', {
        ourwork: ourwork
    })
})

//add data in ourwork

routers.get('/addDataourwork', (req, resp) => {
    return resp.render('addDataourwork');
})

routers.post('/addDataourwork', async (req, resp) => {
    try {
        const { imgUrl, title, siteLink } = req.body

        const addData = new ourWork({ imgUrl, title, siteLink });
        const add = await addData.save();
        return resp.status(201).redirect('/adminourwork');
    } catch (error) {
        resp.status(500).send(error)
    }
})

//update data in ourwork 
routers.get('/updateDataourwork/:id', async (req, resp) => {

    const editData = await ourWork.findById(req.params.id);
    return resp.render('updateDataourwork', {
        data: editData
    });
})

routers.post('/updateDataourwork/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const ourworkdata = await ourWork.findByIdAndUpdate(_id, req.body);
        return resp.status(201).redirect('/adminOurwork');

    } catch (error) {
        resp.status(500).send(error)
    }
})

//delete data in ourwork

routers.post('/ourworkdelete/delete/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const ourworkdata = await ourWork.findByIdAndDelete(_id, req.body);
        return resp.status(201).redirect('/adminourwork');

    } catch (error) {
        resp.status(500).send(error);
    }
})

//admin services router
routers.get('/adminservices', async (req, resp) => {

    const ourservice = await Service.find();

    return resp.render('adminservices', {
        ourservices: ourservice
    })
})

//add data in services

routers.get('/addDataservices', async (res, resp) => {
    return resp.render('addDataservices');
})

routers.post('/addDataservices', async (req, resp) => {
    try {
        const { imgUrl, title, subTitle, link } = req.body;
        const addData = new Service({ imgUrl, title, subTitle, link })
        const add = await addData.save();
        return resp.status(200).redirect('/adminservices');

    } catch (error) {
        resp.status(500).send(error)
    }
})

//update data in sevices
routers.get('/updateDataservices/:id', async (req, resp) => {
    const editData = await Service.findById(req.params.id);
    return resp.render('updateDataservices', {
        data: editData
    })
})
routers.post('/updateDataservices/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const servicesdata = await Service.findByIdAndUpdate(_id, req.body);
        return resp.status(201).redirect('/adminservices')
    } catch (error) {
        resp.status(500).send(error)
    }
})

//  delete data in services 

routers.post('/servicesdelete/delete/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const servicesdata = await Service.findByIdAndDelete(_id, req.body);
        return resp.status(201).redirect('/adminservices')
    } catch (error) {
        resp.status(500).send(error)
    }
})

routers.get('/sign-up', (req, resp) => {
    return resp.render('sign-up');
})

routers.post('/sign-up', async (req, resp) => {
    try {

        const { name, email, password, cpassword } = req.body;

        const userExist = await SignUp.findOne({ email: email })
        if (password != cpassword) {
            return resp.render('sign-up', { isNotMatch: 'password are not match' });
        } else if (userExist) {
            return resp.status(400).render('sign-up', { exist: 'email is already exist' });
        }
        else {
            const signUpData = new SignUp({ name, email, password, cpassword });

            const token = await signUpData.genrateToken();
            req.session.token = token;

            req.session.isLoggedIn = true;
            resp.cookie('jwt', token, {
                expires: new Date(Date.now() + 200000),
                httpOnly: false,
            });
            const register = await signUpData.save();
            return resp.status(201).redirect('/login');
        }
    } catch (error) {
        return resp.status(400).send(error)
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

        req.session.token = token;
        req.session.isLoggedIn = true;
        resp.cookie('jwt', token, {
            expires: new Date(Date.now() + 1000000),
            httpOnly: false,
        });
        if (adminEmail === email) {
            resp.status(200);
            return resp.redirect('/admin');
        }
        if (isMatch) {
            return resp.status(200).redirect('/');
        } else {
            return resp.status(400).render('login', { error: 'wrong login detail' });
        }
    } catch (error) {
        resp.status(400).render('login', { error: 'wrong login detail' });
    }
})

//log-out router
routers.get('/logout', auth, async (req, resp) => {
    try {
        req.session.isLoggedIn = false;
        req.session.token = null;

        resp.clearCookie('jwt');
        console.log('logout successfully');
        await req.user.save();
        return resp.render('login');
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

//branding_booking router

routers.get('/brandingBooking', (req, resp) => {
    return resp.render('brandingBooking');
})

//web design booking router

routers.get('/webBooking', (req, resp) => {
    return resp.render('webBooking');
})

//web development booking

routers.get('/developmentBooking', (req, resp) => {
    return resp.render('developmentBooking');
})

routers.get('*', (req, resp) => {
    resp.render('error')
})

module.exports = routers



