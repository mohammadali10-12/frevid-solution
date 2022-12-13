const express = require ('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT|| 4200

const routers = require('./routes/main');

app.use('/static',express.static('public'));
app.use('/',routers)

//templet engine

app.set('view engine','hbs');
app.set('views','views')
hbs.registerPartials('views/partials')





app.listen(port,()=>{
    console.log(`server start on port number ${port}`);
})