require('dotenv').config();
const express = require('express');
const app = express();

require('./db/conn');



const hbs = require('hbs');

const port = process.env.PORT || 4200

const routers = require('./routes/main');

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('public'));
app.use('/', routers);




//templet engine

app.set('view engine', 'hbs');
app.set('views', 'views')
hbs.registerPartials('views/partials')


// listening to port

app.listen(port, () => {
    console.log(`server start on port number ${port}`);
})


