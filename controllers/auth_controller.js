"use strict";
const passport = require('passport');
const gists = require('./../lib/gists');

module.exports = class {

  constructor(app) {
    app.get('/login', this.login);
    app.get('/logout', this.logout);
    app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'gist']}));
    app.get(
      '/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
      this.githubCallback
    );
  }

  login(req, res) {
    let template = req.xhr ? 'auth/login_form' : 'auth/new';
    res.render(template, { user: req.user });
  }

  logout(req, res) {
    req.logout();
    res.redirect('/');
  }

  githubCallback(req, res) {
    res.redirect('/gist/new');
  }

  static ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      gists.user = req.user;
      return next();
    }
    res.redirect('/login');
  }
};
