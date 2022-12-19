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

<<<<<<< HEAD
routers.get('/services',(req,resp)=>{
    resp.render('services')
})

routers.get('/web',(req,resp)=>{
    resp.render('web')
})

=======
routers.get('/service',(req,resp)=>{
    resp.render('service')
})

routers.get('/service/web',(req,resp)=>{
    resp.render('web')
})

routers.get('/service/branding',(req,resp)=>{
    resp.render('branding')
})

>>>>>>> a69cbd580e83763d404df80c56d6cc025359536c
routers.get('*',(req,resp)=>{
    resp.render('error')
})



module.exports=routers

