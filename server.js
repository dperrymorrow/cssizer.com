
var express = require('express');
  passport = require('passport'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  GitHubStrategy = require('passport-github2').Strategy,
  partials = require('express-partials'),
  gists = require('./lib/gists'),
  MongoStore = require('express-session-mongo'),
  GITHUB_CLIENT_ID = process.env.CSSIZER_CLIENT_ID,
  GITHUB_CLIENT_SECRET = process.env.CSSIZER_CLIENT_SECRET;


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

// configure Express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ 
  store: new MongoStore(), 
  secret: 'asdl324589709534lkladsfjlkasdf', 
  resave: false, 
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var redir = req.isAuthenticated() ? '/editor' : '/login';
  res.redirect(redir);
});

app.get('/editor', ensureAuthenticated, function(req, res){
  gists.getGists(req.user).then(function (gists) {
    res.render('editor/index', { user: req.user, gists: gists, gist: {} });
  });
});

app.post('/editor/create', ensureAuthenticated, function(req, res){
  console.log(req.body.gist);
  gists.create(req.user, req.body.gist).then(function (gists) {
    res.redirect('/editor');
  });
});

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'gist']}));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/editor');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login')
}