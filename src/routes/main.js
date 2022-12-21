const { Router } = require('express/lib/application')
const express = require('express')

const routers = express.Router()

const Web = require('../db/model/web');
const Branding = require('../db/model/branding');
const Development = require('../db/model/development');
const Service = require('../db/model/service');


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

routers.get('*', (req, resp) => {
    resp.render('error')
})



module.exports = routers

