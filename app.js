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

// set up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up public directory for express use
app.use(express.static('public'));

//for session
app.use(
  session({
    secret: 'puppy monkey baby',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  }))

  app.use(function (req, res, next) {
    if (req.session.usr) {
      req.isAuthenticated = true
    } else {
      req.isAuthenticated = false
    }
    console.log(req.isAuthenticated, 'session')
    next()
  })

// ========== ROUTER ============
// app.use('/', routesFile)

//========== ROUTES =================
app.get('/', (req, res) => {
  res.redirect('/login');
})

app.get('/login', (req, res) => {
  res.render('login', {isAuthenticated: req.isAuthenticated});
})

// ----------- Login ----------------
app.post('/home', (req, res) => {
  const user = dal.isUser(req.body.username);
  if (req.body.password === user.password) {
    req.session.usr = {name: user.name};
    res.render('home');
  }
  else { res.send('Please reload and re-enter your username and password.')}
})

// ---------- Home ------------------
app.get('/my_page', (req, res) => {
  if (req.isAuthenticated) {
    const user = dal.isUser(req.params.username)
    res.render('my_page', {user, loggedIn: req.session.usr});
  }
  else {
    res.redirect('/login')
  }
})
// ---------- my_page ------------------
// app.get('/my_page', (req, res) => {
//   res.render('my_page');
// })
//----------- logout ------------------
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

// // ------ isAuthenticated -----
// app.get('/', (req, res) => {
//   if(req.isAuthenticated) {
//     let users = dal.getAllUsers();
//     res.render('/', {loggedUsr:req.session.usr});
//     console.log("Check this");
//   }
//   else { res.redirect('/login')};
// })

//////////////////////////////////////////////////
//Port setup
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
