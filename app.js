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

  function authorize(req, res, next) {
    if(req.session.usr) {
      next();
    }
    else {
      res.render('sorry');
    }
  }

//========== ROUTES =================
app.get('/', (req, res) => {
  res.redirect('/login');
})

app.get('/login', (req, res) => {
  res.render('login');
})

app.get('/home', authorize, (req, res) => {
  const user = dal.getUser(req.session.usr['username'])
  res.render('home', {user: user});
})

// ---------- SIGNUP PAGE ------------------
app.get('/signup', (req, res) => {
  res.render('signup')
})
app.post('/signup', (req, res) => {
    let newbie = dal.addUsr(req.body.firstName, req.body.lastName, req.body.userName, req.body.createPassword);
    res.redirect('/login');
  })
// ---------- HOME PAGE ------------------
app.post('/home', (req, res) => {
  const user = dal.getUser(req.body.username);
  if (req.body.password === user.password) {
    req.session.usr = {username: user.username};
    res.render('home', {user});
  }
  else { res.redirect('/login')}
});

// ---------- MyPage ------------------
app.get('/my_page', authorize, (req, res) => {
    const user = dal.getUser(req.session.usr['username'])
    res.render('my_page', {user});
})

//----------- logout ------------------
app.get('/logout', (req, res) => {
  req.session.destroy(() =>{
    res.redirect('/login');
  })
})

//////////////////////////////////////////////////
//Port setup
app.listen(3000, (req, res) => {
  console.log('Server running on 3000');
})
