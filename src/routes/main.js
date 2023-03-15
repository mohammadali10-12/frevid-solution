const { Router } = require('express/lib/application')
const express = require('express');


const routers = express.Router();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
routers.use(cookieParser());

const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
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
const ourWork = require('../db/model/ourwork');
const SignUp = require('../db/model/sign-up');
const auth = require('../db/middleware/auth');
const BrandingBooking = require('../db/model/brandingBooking');
const WebBooking = require('../db/model/webBooking');
const DevelopmentBooking = require('../db/model/developmentBooking');
// const async = require('hbs/lib/async');
// const { send } = require('process');

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

    const workDetail = await ourWork.find()
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

// admin branding_Booking
routers.get('/adminBrandingBooking', async (req, resp) => {
    const Data = await BrandingBooking.find({})
    return resp.render('adminBrandingBooking', {
        data: Data
    });
})

// Remove user in Branding_Booking
routers.post('/adminBrandingBooking/delete/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const bookingData = await BrandingBooking.findByIdAndDelete(_id, req.body);
        return resp.status(201).redirect('/adminBrandingBooking');
    } catch (error) {
        resp.status(500).send(error)
    }
})

// send mail in Branding Booking

routers.get('/sendBrandingMail/:id', async (req, resp) => {
    const sendMail = await BrandingBooking.findById(req.params.id);
    return resp.render('sendBrandingMail', {
        data: sendMail
    });
})

routers.post('/sendBrandingMail', async (req, resp) => {
    try {
        const { email, message } = req.body;
        const send = new BrandingBooking({ email, message });
        sendUserBrandingBookingMail(email, message);
        resp.status(201).redirect('/adminBrandingBooking')
    } catch (error) {



    }
});

const sendUserBrandingBookingMail = async (email, message) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "you selected branding service ", // Subject line
        text: message, // plain text body
        // html body
    });
}
// admin Web_Booking
routers.get('/adminWebBooking', async (req, resp) => {
    const Data = await WebBooking.find()
    return resp.render('adminWebBooking', {
        data: Data
    });
})
// Remove user in Web-Design_Booking
routers.post('/adminWebBooking/delete/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const bookingData = await WebBooking.findByIdAndDelete(_id, req.body);
        return resp.status(201).redirect('/adminWebBooking');
    } catch (error) {
        resp.status(500).send(error)
    }
})

//send mail in web-design
routers.get('/sendWebDesignMail/:id', async (req, resp) => {
    const sendMail = await WebBooking.findById(req.params.id);
    return resp.render('sendWebDesignMail', {
        data: sendMail
    });
})

routers.post('/sendWebDesignMail', async (req, resp) => {
    try {
        const { email, message } = req.body;
        const send = new BrandingBooking({ email, message });
        sendUserWebBookingMail(email, message);
        resp.status(201).redirect('adminWebBooking')
    } catch (error) {
        resp.status(500).send(error)
    }
});

const sendUserWebBookingMail = async (email, message) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "you selected web-Design service ", // Subject line
        text: message, // plain text body
    });

}

// Admin Development_Booking
routers.get('/adminDevelopmentBooking', async (req, resp) => {
    const Data = await DevelopmentBooking.find()
    return resp.render('adminDevelopmentBooking', {
        data: Data
    });
})

// Remove user in Development_Booking
routers.post('/adminDevelopmentBooking/delete/:id', async (req, resp) => {
    try {
        const _id = req.params.id;
        const bookingData = await DevelopmentBooking.findByIdAndDelete(_id, req.body);
        return resp.status(201).redirect('/adminDevelopmentBooking');
    } catch (error) {
        resp.status(500).send(error)
    }
})
 
//send mail in web-Development
routers.get('/sendDevelopmentMail/:id', async (req, resp) => {
    const sendMail = await DevelopmentBooking.findById(req.params.id);
    return resp.render('sendDevelopmentMail', {
        data: sendMail
    });
})


routers.post('/sendDevelopmentMail', async (req, resp) => {
    try {
        const { email, message } = req.body;
        const send = new DevelopmentBooking({ email, message });
        sendUserDevelopmentBookingMail(email, message);
        resp.status(201).redirect('/adminDevelopmentBooking')
    } catch (error) {
        resp.status(500).send(error)
    }
});

const sendUserDevelopmentBookingMail = async (email, message) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "you selected Web Development service ", // Subject line
        text: message, // plain text body
    });

}
// Sign-Up router
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

routers.get('/brandingBooking', auth, (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    return resp.render('brandingBooking', { isLoggedIn });
});

routers.post('/brandindBooking', async (req, resp) => {
    try {
        const { name, email, number, budget, businesstype } = req.body;
        const Booking = new BrandingBooking({ name, email, number, budget, businesstype });
        const BookingData = await Booking.save();
        sendBrandingBookingMail(email, name, budget, businesstype);
        resp.status(201).redirect('/');
    } catch (error) {
        resp.status(500).send(error)
    }
});

const sendBrandingBookingMail = async (email, name, budget, businesstype) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "confimation mail for selected branding service ", // Subject line
        text: `welcome ${name} your service budget ${budget} and your bussiness Type is ${businesstype}`, // plain text body
        // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
}
//web design booking router

routers.get('/webBooking', auth, (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    return resp.render('webBooking', { isLoggedIn });
});

routers.post('/webdBooking', async (req, resp) => {
    try {
        const { name, email, number, budget, businesstype } = req.body;
        const Booking = new WebBooking({ name, email, number, budget, businesstype });
        const BookingData = await Booking.save();
        sendWebgBookingMail(email, name, budget, businesstype);
        resp.status(201).redirect('/');
    } catch (error) {
        resp.status(500).send(error)
    }
});

const sendWebgBookingMail = async (email, name, budget, businesstype) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "you selected web Designing service ", // Subject line
        text: `welcome ${name} your service budget ${budget} and your bussiness Type is ${businesstype}`, // plain text body
        // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
}
//web development booking

routers.get('/developmentBooking', auth, (req, resp) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    return resp.render('developmentBooking', { isLoggedIn });
});

routers.post('/developmentdBooking', async (req, resp) => {
    try {
        const { name, email, number, budget, businesstype } = req.body;
        const Booking = new DevelopmentBooking({ name, email, number, budget, businesstype });
        const BookingData = await Booking.save();
        sendDevelopmentgBookingMail(email, name, budget, businesstype);
        resp.status(201).redirect('/');
    } catch (error) {
        resp.status(500).send(error)
    }
});

const sendDevelopmentgBookingMail = async (email, name, budget, businesstype) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "you selected web Development service ", // Subject line
        text: `welcome ${name} your service budget ${budget} and your bussiness Type is ${businesstype}`, // plain text body
        // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
}

//forgot password

routers.get('/forgotpassword', (req, resp) => {
    return resp.render('forgotpassword');
})

routers.post('/forgotpassword', async (req, resp) => {
    try {
        const email = req.body.email;
        const userData = await SignUp.findOne({ email: email });
        if (userData) {
            const randomstrings = randomstring.generate();
            const updatepassword = await SignUp.updateOne({ email: email }, { $set: { token: randomstring } });
            sendMail(userData.email, randomstrings);
            resp.render('forgotpassword', { message: 'please check your mail to reset your password' });
        } else {
            resp.render('forgotpassword', { message: 'user email is incorrect' });
        }
    } catch (error) {
        resp.status(500).send(error)
    }
})

routers.get('/newpassword/:token', async (req, resp) => {
    const token = req.body.token;
    const tokenData = await SignUp.findOne({ token: token });
    if (tokenData) {
        resp.render('newpassword', { user_id: tokenData._id })
    } else {
        resp.render('Error')
    }
})

//reset password 

routers.post('/newpassword/:token', async (req, resp) => {
    try {
        const password = req.body.password;
        const _id = req.params.id;
        const secure_password = await bcrypt.hash(password, 10);
        const updateData = await SignUp.findByIdAndUpdate(_id, { $set: { password: secure_password, token: "" } });

        resp.redirect('/login')
    } catch (error) {
        resp.status(500).send(error)
    }
})
routers.get('*', (req, resp) => {
    resp.render('error')
})



const sendMail = async (email, token) => {

    let transpoter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mahammadalisunasara06@gmail.com', // generated ethereal user
            pass: 'uymsafbnaxxohelh'
        },
    });

    let info = await transpoter.sendMail({
        from: '"mohammadali 👻" <foo@example.com>', // sender address
        to: email,// list of receivers
        subject: "reset password", // Subject line
        text: "this is my first mail", // plain text body
        html: `<a href="http://localhost:4200/newpassword/${token}">To reset password</a>` // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log(info);
};


module.exports = routers



