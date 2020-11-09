'use strict';
const express = require('express');
const app = express();
const port = 3000;

const passport = require('./utils/pass');
const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  }
  else {
    res.redirect('/form');
  }
};

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000},
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, {secure: true}).send('setCookie');
});

app.get('/readCookie', (req, res) => {
  console.log('Cookies', req.cookies);
  res.send('cookie read');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('deleteCookie');
});

app.get('/more', loggedIn, (req, res) => {
  res.send('eee');
});

app.get('/form', (req, res) => {
  res.render('form');
  console.log('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret');
});

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
    });

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
