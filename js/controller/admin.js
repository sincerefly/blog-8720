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
    return res.redirect('/admin');
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

exports.index = function(req, res) {
  var blog_host, info;
  blog_host = settings.blog_host;
  info = {
    'blog_host': blog_host
  };
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    return res.render('admin/index', info);
  }
};

exports.archive = function(req, res) {
  var blog_host, info;
  blog_host = settings.blog_host;
  info = {
    'blog_host': blog_host
  };
  if (!req.session.user) {
    return res.redirect('/login');
  } else {
    return Article.find({}).select('title content category tags pv meta.createDate meta.timeStamp').populate({
      path: 'category',
      select: 'name -_id'
    }).sort({
      'meta.timeStamp': -1
    }).exec(function(err, articles) {
      var _ar, _articles, ar, data, i, len;
      if (err) {
        throw err;
      }
      _articles = [];
      for (i = 0, len = articles.length; i < len; i++) {
        ar = articles[i];
        _ar = {
          'title': ar.title,
          'meta': {
            'createDate': ar.meta.createDate,
            'timeStamp': ar.meta.timeStamp
          }
        };
        _articles.push(_ar);
      }
      console.log(_articles);
      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'articles': _articles
      };
      return res.render('admin/archive', data);
    });
  }
};
