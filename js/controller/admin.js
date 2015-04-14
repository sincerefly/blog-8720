var Article, crypto, settings;

settings = require('../../settings.js');

Article = require('../schemas/article');

crypto = require('crypto');

exports.login = function(req, res) {
  var data;
  data = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'blog_host': settings.blog_host
  };
  return res.render('admin/login', data);
};

exports.loginCheck = function(req, res) {
  var key, login_key, md5;
  login_key = settings.login_key;
  md5 = crypto.createHash('md5');
  key = md5.update(req.body.key).digest('hex');
  console.log(key);
  if (key === login_key) {
    req.session.user = key;
    return res.redirect('/admin');
  } else {
    return res.redirect('/login');
  }
};

exports.logout = function(req, res) {
  req.session.user = null;
  return res.redirect('/login');
};

exports.index = function(req, res) {
  var info;
  info = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'blog_host': settings.blog_host
  };
  return res.render('admin/index', info);
};

exports.archive = function(req, res) {
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
};
