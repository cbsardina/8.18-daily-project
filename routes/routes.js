//////////////////////routes.js///////////////////////////

const express = require('express');
const router = express.Router();
const dal = require('../dal');

// verify login
function isLoggedIn(req, res, next) {
  if(req.session.usr) {
    next();
  }
  else {
    res.render('sorry');
  }
}

//========== ROUTES =================

// ----- ROOT PG -----
router.route('/')
  .get(function(req, res) {
    res.redirect('/login');
})

// ----- /LOGIN -----
router.route('/login')
  .get(function(req, res) {
  res.render('login');
})

// ----- /HOME -----
router.route('/home')
  .get(isLoggedIn, function(req, res) {
    const user = dal.getUser(req.session.usr['username'])
    res.render('home', {user: user});
})
  .post(function(req, res) {
    const user = dal.getUser(req.body.username);
    if (req.body.password === user.password) {
      req.session.usr = {username: user.username};
      res.render('home', {user});
    }
    else { res.redirect('/login')}
});

// ----- /SIGNUP -----
router.route('/signup')
  .get(function(req, res) {
    res.render('signup')
  })
  .post(function(req, res) {
    let newbie = dal.addUsr(req.body.firstName, req.body.lastName, req.body.userName, req.body.createPassword);
    res.redirect('/login');
  })

// ----- /MY_PAGE -----
router.route('/my_page')
  .get(isLoggedIn, function(req, res) {
    const user = dal.getUser(req.session.usr['username'])
    res.render('my_page', {user});
  })

// ----- /LOGOUT -----
router.route('/logout')
  .get(function(req, res) {
  req.session.destroy(() =>{
    res.redirect('/login');
  })
})


//======== EXPORTS ====================
module.exports = router;
