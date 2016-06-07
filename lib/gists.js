"use strict";

var _ = require('underscore'),
  q = require('q'),
  async = require('async'),
  request = require('request'),
  fs = require('fs');

var gistMod = {

  user: {
    token: null
  },

  defaultGistId: "986200720067e5817f28a6f18ab6fc8b",

  all: function () {
    let defer = q.defer(),
      opts = optsFromUrl(`users/${this.user.username}/gists`);

    request.get(opts, (err, response, body) => {
      if (err) throw new Error(err);
      defer.resolve(filterGists(JSON.parse(body)));
    });

    return defer.promise;
  },

  find: function (id) {
    let defer = q.defer(),
      opts = optsFromUrl(`gists/${id}`);

    request.get(opts, (err, response, body) => {
      if (err) throw new Error(err);
      let gist = validateFiles(JSON.parse(body));
      defer.resolve(gist);
    });

    return defer.promise;
  },

  new: function () {
    let defer = q.defer();
    this.find(this.defaultGistId).then(gist => {
      defer.resolve(gist);
    });
    return defer.promise;
  },

  update: function (post) {
    let defer = q.defer(),
      opts = optsFromUrl(`gists/${post.id}`);

    opts.body = JSON.stringify(format(post)) ;

    request.patch(opts, (error, response, body) => {
      if (error) throw new Error(error);
      defer.resolve();
    });

    return defer.promise;
  },

  create: function (post) {
    let defer = q.defer(),
      opts = optsFromUrl('gists');

    opts.body = JSON.stringify(format(post)) ;

    request.post(opts, (error, response, body) => {
      if (error) throw new Error(error);
      defer.resolve(JSON.parse(body));
    });

    return defer.promise;
  }
};

// our format to github format
function format(post) {
  let gist = {
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
      'Authorization': `token ${gistMod.user.token}`
    }
  };
}

function validateFiles(gist) {
  // only take the css and html files, make sure we just have one of each
  gist.files = _.chain(gist.files)
    .filter(file => _.contains(['CSS', 'HTML'], file.language))
    .uniq(file => file.language)
    .value();

  if (!_.findWhere(gist.files, {language: "HTML"})) gist.files.push(gistMod.defaultHTML);
  if (!_.findWhere(gist.files, {language: "CSS"})) gist.files.push(gistMod.defaultCSS);

  gist.files = _.sortBy(gist.files, file => file.language);
  return gist
}

function buildUrl(url) {
  url = url.search('github') != -1 ? url : `https://api.github.com/${url}`;
  return `${url}?client_id=${process.env.CSSIZER_CLIENT_ID}&client_secret=${process.env.CSSIZER_CLIENT_SECRET}`;
}

function filterGists(gists) {
  return _.filter(gists, gist => {
    let types = _.pluck(gist.files, 'language')
    return _.contains(types, 'CSS');
  });
}

module.exports = gistMod;
