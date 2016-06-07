"use strict";
var passport = require('passport');
var gists = require('./../lib/gists');

module.exports.controller = function (app) {

  app.get('/login', (req, res) => {
    let template = req.xhr ? 'auth/login_form' : 'auth/new';
    res.render(template, { user: req.user });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  // github oauth routes
  app.get(
    '/auth/github',
    passport.authenticate('github', {scope: ['user:email', 'gist']})
  );

  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => res.redirect('/gist/new')
  );
};

module.exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    gists.user = req.user;
    return next();
  }
  res.redirect('/login');
}