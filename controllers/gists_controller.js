"use strict";
const gists = require('./../lib/gists');
const AuthController = require('./auth_controller');

module.exports = class {

  constructor(app) {
    app.get('/gist/new', AuthController.ensureAuthenticated, this._new);
    app.get('/gist/index', AuthController.ensureAuthenticated, this.index);
    app.get('/gist/:id/edit', this.edit);
    app.post('/gist/:id/update', AuthController.ensureAuthenticated, this.update)
    app.post('/gist/create', AuthController.ensureAuthenticated, this.create);
  }

  index(req, res) {
    gists.all().then(
      gists => res.render('gist/index', {user: req.user, gists: gists})
    );
  }

  create(req, res) {
    gists.create(req.body).then(
      gist => res.redirect(`/gist/${gist.id}/edit`)
    );
  }

  update(req, res) {
    gists.update(req.body).then(
      gist => res.redirect(`/gist/${req.body.id}/edit`)
    );
  }

  edit(req, res) {
    gists.find(req.params.id).then(gist => {
      if (!gist) res.render('notFound');
      res.render('gist/show', {gist: gist, user: req.user});
    });
  }

  _new(req, res){
    gists.new().then(
      gist => res.render('gist/show', { gist: gist, user: req.user })
    );
  }

};