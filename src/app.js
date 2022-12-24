const express = require('express');
const app = express();



// require('./db/conn');

const bodyParser = require('body-parser');

const hbs = require('hbs');

const port = process.env.PORT || 4400

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
    console.log(`server start on port number ${port}`);
})