const { Router } = require('express/lib/application')
const express = require('express')

const routers = express.Router()

const Web = require('../db/model/web')


// all routes

routers.get('/',(req,resp)=>{
    resp.render('index')
})

routers.get('/about',(req,resp)=>{
    resp.render('about')
})

routers.get('/service',(req,resp)=>{
    resp.render('service')
})

routers.get('/service/web', async (req,resp)=>{
    const webs = await Web.find()

    resp.render('web',{
        webs:webs
    })
})

routers.get('/service/branding',(req,resp)=>{
    resp.render('branding')
})

routers.get('*',(req,resp)=>{
    resp.render('error')
})



module.exports=routers

