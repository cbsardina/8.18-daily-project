//////////////////////app.js///////////////////////////

const express = require('express');
const mustacheExpress = require('mustache-express');
const dal = require('./dal.js');
const app = express();
const parseurl = require('parseurl');
const session = require('express-session');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up public directory for express use
app.use(express.static('public'));

//session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  }))


// =========== ROUTER =========================//
app.use('/', routes);


// =========== PORT SETUP =========================//
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
