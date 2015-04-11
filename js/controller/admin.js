var Article, crypto, settings;

settings = require('../../settings.js');

Article = require('../schemas/article');

crypto = require('crypto');

exports.login = function(req, res) {
  var data;
  data = {
    'blog_host': settings.blog_host
  };
  if (!req.session.user) {
    return res.render('admin/login', data);
  } else {
    req.session.user = null;
    return res.jsonp(req.session.user);
  }
};

exports.loginCheck = function(req, res) {
  var _key, key, md5;
  _key = req.body.key;
  md5 = crypto.createHash('md5');
  key = md5.update(req.body.key).digest('hex');
  if (_key === 'only31031') {
    req.session.user = key;
    return res.jsonp({
      'ok': key
    });
  } else {
    return res.redirect('/');
  }
};

exports.logout = function(req, res) {
  if (!req.session.user) {
    return res.render('admin/login');
  } else {
    req.session.user = null;
    return res.redirect('/');
  }
};
