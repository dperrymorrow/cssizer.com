"use strict";

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const expressLess = require('express-less');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
const partials = require('express-partials');
// const gists = require('./lib/gists');
const MongoStore = require('express-session-mongo');

const GITHUB_CLIENT_ID = process.env.CSSIZER_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.CSSIZER_CLIENT_SECRET;
const CSSIZER_SESSION = process.env.CSSIZER_SESSION;

const AuthController = require('./controllers/auth_controller');
const GistsController = require('./controllers/gists_controller');

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

const app = express();
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

const auth = new AuthController(app);
const gists = new GistsController(app);

// root path
app.get('/', (req, res) => {
  let redir = req.isAuthenticated() ? '/gist/new' : '/login';
  res.redirect(redir);
});

app.listen(3000);
