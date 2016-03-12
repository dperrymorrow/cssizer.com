var _ = require('underscore'),
  q = require('q'),
  async = require('async'),
  request = require('request');

var gistMod = {

  user: null,

  defaultCSS: {
    filename: 'styles.css',
    type: 'text/css',
    language: 'CSS',
    truncated: false,
    content: 'body { color: blue; }'
  },

  defaultHTML: {
    filename: 'page.html',
    type: 'text/html',
    language: 'HTML',
    content: '<body>'
  },

  all: function () {
    var defer = q.defer(),
      opts = optsFromUrl('users/' + this.user.username + "/gists");

    request.get(opts, function (err, response, body) {
      if (err) throw new Error(err);
      defer.resolve(filterGists(JSON.parse(body)));
    });

    return defer.promise;
  },

  find: function (id) {
    var defer = q.defer(),
      opts = optsFromUrl('gists/' + id);

    request.get(opts, function (err, response, body) {
      if (err) throw new Error(err);
      var gist = validateFiles(JSON.parse(body));
      defer.resolve(gist);
    });

    return defer.promise;
  },

  new: function () {
    return {
      description: 'New Gist',
      files: [
        this.defaultCSS,
        this.defaultHTML
      ]
    };
  },

  update: function (post) {

    var defer = q.defer(),
      opts = optsFromUrl('gists/' + post.id);

    opts.body = JSON.stringify(format(post)) ;

    request.patch(opts, function (error, response, body) {
      if (error) throw new Error(error);
      defer.resolve();
    });

    return defer.promise;
  },

  create: function (post) {
    var defer = q.defer(),
      opts = optsFromUrl('gists');

    opts.body = JSON.stringify(format(post)) ;

    request.post(opts, function (error, response, body) {
      if (error) throw new Error(error);
      defer.resolve(JSON.parse(body));
    });

    return defer.promise;
  }
}

// our format to github format
function format(post) {
  var gist = {
    description: post.description,
    public: true,
    files: {}
  };

  if (post.id) gist.id = post.id;

  gist.files[post.files.CSS.filename] = {
    content: post.files.CSS.content,
    language: "CSS"
  };

  gist.files[post.files.HTML.filename] = {
    content: post.files.HTML.content,
    language: "HTML"
  };

  return gist;
}

// anon methods
function optsFromUrl(url) {
  return {
    url: buildUrl(url),
    headers: {
      'User-Agent': 'api-request',
      'Authorization': 'token ' + gistMod.user.token
    }
  };
}

function validateFiles(gist) {
  // only take the css and html files, make sure we just have one of each
  gist.files = _.chain(gist.files)
    .filter(function (file) { return _.contains(['CSS', 'HTML'], file.language); })
    .uniq(function (file) { return file.language;})
    .value();

  if (!_.findWhere(gist.files, {language: "HTML"})) gist.files.push(gistMod.defaultHTML);
  if (!_.findWhere(gist.files, {language: "CSS"})) gist.files.push(gistMod.defaultCSS);

  gist.files = _.sortBy(gist.files, function (file) { return file.language; });
  return gist
}

function buildUrl(url) {
  url = url.search('github') != -1 ? url : "https://api.github.com/" + url;
  return url + "?client_id=" + process.env.CSSIZER_CLIENT_ID + "&client_secret=" + process.env.CSSIZER_CLIENT_SECRET;
}

function filterGists(gists) {
  return _.filter(gists, function (gist) {
    var types = _.pluck(gist.files, 'language')
    return _.contains(types, 'CSS');
  });
}

module.exports = gistMod;
