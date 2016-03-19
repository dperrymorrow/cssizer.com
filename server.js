
var express = require('express');
  passport = require('passport'),
  session = require('express-session'),
  expressLess = require('express-less'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  GitHubStrategy = require('passport-github2').Strategy,
  partials = require('express-partials'),
  gists = require('./lib/gists'),
  MongoStore = require('express-session-mongo'),
  GITHUB_CLIENT_ID = process.env.CSSIZER_CLIENT_ID,
  GITHUB_CLIENT_SECRET = process.env.CSSIZER_CLIENT_SECRET,
  CSSIZER_SESSION = process.env.CSSIZER_SESSION;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    profile.token = accessToken;
    return done(null, profile);
  }
));

var app = express();
app.locals._ = require("underscore");

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/less-css', expressLess(__dirname + '/less', { debug: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
  store: new MongoStore(),
  secret: CSSIZER_SESSION,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var redir = req.isAuthenticated() ? '/editor/new' : '/login';
  res.redirect(redir);
});

// editor
app.get('/editor/new', ensureAuthenticated, function(req, res){
  res.render('editor/index', { user: req.user, gists: [], gist: gists.new() });
});

app.get('/editor/:id/edit', ensureAuthenticated, function (req, res) {
  gists.find(req.params.id).then(function (gist) {
    if (!gist) res.render('notFound');
    res.render('editor/index', {gist: gist, gists: gists, user: req.user});
  });
});

app.get('/iframe', function (req, res) {
  res.render('iframe');
});

app.post('/editor/:id/update', ensureAuthenticated, function (req, res) {
  gists.update(req.body).then(function (gist) {
    res.redirect('/editor/' + req.body.id + '/edit');
  });
});

app.post('/editor/create', ensureAuthenticated, function(req, res){
  gists.create(req.body).then(function (gist) {
    res.redirect('/editor/' + gist.id + "/edit");
  });
});

// user info
app.get('/user/show', ensureAuthenticated, function (req, res) {
  gists.all().then(function (gists) {
    res.render('user/show', {user: req.user, gists: gists});
  });
});

// authorization
app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// github oauth routes
app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'gist']}));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/editor/new');
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    gists.user = req.user;
    return next();
  }
  res.redirect('/login')
}

app.listen(3000);