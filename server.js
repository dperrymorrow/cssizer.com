"use strict";

var express = require('express'),
  passport = require('passport'),
  session = require('express-session'),
  expressLess = require('express-less'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  GitHubStrategy = require('passport-github2').Strategy,
  partials = require('express-partials'),
  gists = require('./lib/gists'),
  MongoStore = require('express-session-mongo');

const GITHUB_CLIENT_ID = process.env.CSSIZER_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CSSIZER_CLIENT_SECRET;
const CSSIZER_SESSION = process.env.CSSIZER_SESSION;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      profile.token = accessToken;
      return done(null, profile);
    }
  )
);

var app = express();
app.locals._ = require("underscore");

// configure Express
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');

app.use('/less-css', expressLess(`${__dirname}/less`, { debug: true }));
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
app.use(express.static(`${__dirname}/public`));

// app setup, fire up controllers
var AuthController = require('./controllers/auth_controller').controller(app);
var GistsController = require('./controllers/gists_controller').controller(app);

app.get('/', (req, res) => {
  let redir = req.isAuthenticated() ? '/gist/new' : '/login';
  res.redirect(redir);
});

app.listen(3000);
