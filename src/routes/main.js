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

routers.get('/services',(req,resp)=>{
    resp.render('services')
})

routers.get('/web',(req,resp)=>{
    resp.render('web')
})

routers.get('*',(req,resp)=>{
    resp.render('error')
})



module.exports=routers

