var _ = require('underscore'),
  q = require('q'),
  request = require('request');

module.exports = {

  getGists: function (user) {
    var defer = q.defer(),
      opts = optsFromUrl('users/' + user.username + "/gists", user);

    console.log(opts);

    request.get(opts, function (err, response, body) {
      if (err) throw new Error(err);
      defer.resolve(filterGists(JSON.parse(body)));
    });

    return defer.promise;
  },

  create: function (user, gist) {
    var defer = q.defer(),
      opts = optsFromUrl('gists', user);

    opts.body = JSON.stringify(prepareGist(gist)) ;

    request.post(opts, function (error, response, body) {
      // console.log(body);
      defer.resolve();
    });

    return defer.promise;
  }
}

function prepareGist(gist) {
  return {
    description: gist.description,
    public: true,
    files: {
      "styles.css": {
        content: gist.css
      },
      "page.html": {
        content: gist.html
      }
    }
  };
}

function optsFromUrl(url, user) {
  return {
    url: buildUrl(url, user),
    headers: {
      'User-Agent': 'api-request',
      'Authorization': 'token ' + user.token
    }
  };
}

function buildUrl(url, user) {
  return "https://api.github.com/" + url + "?client_id=" + process.env.CSSIZER_CLIENT_ID + "&client_secret=" + process.env.CSSIZER_CLIENT_SECRET;
}

function filterGists(gists) {
  return _.filter(gists, function (gist) {
    var types = _.pluck(gist.files, 'language')
    return _.contains(types, 'CSS');
  });
}