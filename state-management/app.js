'use strict';
const express = require('express');
const app = express();
const port = 3000;
const username = 'foo';
const password = 'bar';
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 1000},
}));

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

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if ((req.session.logged === true)) {
    res.render('secret');
  }
  else res.location('form');
});

app.post('/login', (req, res) => {

  console.log(req.body);
  if (req.body.username === username && req.body.password === password) {
    req.session.logged = true;
    res.redirect('/secret');
  }
  else {
    req.session.logged = false;
    res.redirect('/form');
  }
  res.send('ok');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
