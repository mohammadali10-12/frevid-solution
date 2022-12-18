const { Router } = require('express/lib/application')
const express = require('express')

const routers = express.Router()


// all routes

routers.get('/',(req,resp)=>{
    resp.render('index')
})

routers.get('/about',(req,resp)=>{
    resp.render('about')
})

routers.get('/service/',(req,resp)=>{
    resp.render('service')
})

routers.get('/service/web',(req,resp)=>{
    resp.render('web')
})

routers.get('/service/logo',(req,resp)=>{
    resp.render('logo')
})

routers.get('*',(req,resp)=>{
    resp.render('error')
})



module.exports=routers

