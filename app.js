//////////////////////app.js///////////////////////////
///////////////////////////////////////////////////////

const express = require('express');
const mustacheExpress = require('mustache-express');
const dal = require('./dal.js');
const app = express();
const parseurl = require('parseurl');
const session = require('express-session');
const bodyParser = require('body-parser');

// const routes = require('./routes/routes')
// ^ for router ^

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//for session
app.use(
  session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up public directory for express use
app.use(express.static('public'));



// ========== ROUTER ============
// app.use('/', routesFile)

//========== ROUTES =================
app.get('/', (req, res) => {
  res.render('login');
})
// ----- '/login/'-----
app.post('/login/', (req, res) => {
  const user = dal.getByUsername(req.body.username);
  if (req.body.password === user.password) {
    req.session.usr = {name: user.name};
    res.redirect('/');
  }
  else { res.send('Please reload and re-enter your credentials.')}
})

// ----- '/' - isAuthenticated -----
app.get('/', (req, res) => {
  if(req.isAuthenticated) {
    let users = dal.getAllUsers();
    res.render('/', {loggedUsr:req.session.usr});
  }
  else { res.redirect('/login/')};
})



//////////////////////////////////////////////////
//Port setup
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
