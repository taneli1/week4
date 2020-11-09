'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id);
  done(null, id);
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async (id, done) => {
  console.log('deserialize', id);

  done(null, getUser(id));
});

passport.use(new Strategy(
    (username, password, done) => {

      let currUser = getUserLogin(username);

      if (!currUser) {
        return done(null, false);
      }
      else if (currUser.password !== password) {
        return done(null, false);
      }
      else return done(null, currUser.user_id);
    },
));

module.exports = passport;