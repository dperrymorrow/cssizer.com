"use strict";
var gists = require('./../lib/gists');
var ensureAuthenticated = require('./auth_controller').ensureAuthenticated;

module.exports.controller = function (app) {

  // begin working on a new gist
  app.get('/gist/new', ensureAuthenticated, (req, res) => {
    gists.new().then(
      gist => res.render('gist/show', { gist: gist, user: req.user })
    );
  });

  // edit an existing gist
  // !! the only route that does not need to be authenticated
  app.get('/gist/:id/edit', function (req, res) {
    gists.find(req.params.id).then(gist => {
      if (!gist) res.render('notFound');
      res.render('gist/show', {gist: gist, user: req.user});
    });
  });

  // save changes to existing gist
  app.post('/gist/:id/update', ensureAuthenticated, (req, res) => {
    gists.update(req.body).then(
      gist => res.redirect(`/gist/${req.body.id}/edit`)
    );
  });

  // create a new gist
  app.post('/gist/create', ensureAuthenticated, (req, res) => {
    gists.create(req.body).then(
      gist => res.redirect(`/gist/${gist.id}/edit`)
    );
  });

  // get all user's gists
  app.get('/gist/index', ensureAuthenticated, (req, res) => {
    gists.all().then(
      gists => res.render('gist/index', {user: req.user, gists: gists})
    );
  });
};