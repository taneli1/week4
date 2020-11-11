'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');

// local strategy for username password login
passport.use(new LocalStrategy(
    async (username, password, done) => {
      const params = [username];

      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      }
      catch (err) {
        return done(err);
      }
    }));

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'testing',
    },
    (jwtPayload, done) => {
      console.log(`pass.js: .use jwt ${jwtPayload.user_id}`);

      return userModel.getUser(jwtPayload.user_id).then(user => {
        return done(null, user);
      }).catch(err => {
        return done(err);
      });
    },
));

module.exports = passport;