<<<<<<< HEAD
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




// listening to port
app.listen(port,()=>{
=======
const express = require('express');
const app = express();



require('./db/conn');

const bodyParser = require('body-parser');

const hbs = require('hbs');

const port = process.env.PORT || 4200

const routers = require('./routes/main');

app.use('/static', express.static('public'));
app.use('/', routers)



//db connection







//templet engine

app.set('view engine', 'hbs');
app.set('views', 'views')
hbs.registerPartials('views/partials')


// listening to port

app.listen(port, () => {
>>>>>>> a69cbd580e83763d404df80c56d6cc025359536c
    console.log(`server start on port number ${port}`);
})