var Category, Speak, settings;

Speak = require('../schemas/speak');

Category = require('../schemas/category');

settings = require('../../settings.js');

exports.getArchive = function(req, res) {
  return Speak.find({}).select('content meta.createDate meta.timeStamp').sort({
    'meta.timeStamp': -1
  }).limit(10).exec(function(err, speaks) {
    var _speak, _speaks, data, i, len, speak;
    if (err) {
      throw err;
    }
    _speaks = [];
    for (i = 0, len = speaks.length; i < len; i++) {
      speak = speaks[i];
      _speak = {
        'content': speak.content,
        'meta': {
          'createDate': speak.meta.createDate,
          'timeStamp': speak.meta.timeStamp
        }
      };
      _speaks.push(_speak);
    }
    console.log(_speaks);
    data = {
      'blog_title': settings.blog_title,
      'blog_description': settings.blog_description,
      'blog_host': settings.blog_host,
      'speaks': _speaks
    };
    return res.render('speak', data);
  });
};

exports.getPostForm = function(req, res) {
  var blog_host, info;
  blog_host = settings.blog_host;
  info = {
    'blog_host': blog_host
  };
  return res.render('admin/speak', info);
};

exports.post = function(req, res) {
  var _createDate, _createTime, _date, _hours, _minutes, _month, _now, _seconds, _speak, _timeStamp, _year, appendzero;
  _now = new Date();
  _year = _now.getFullYear();
  _month = _now.getMonth() + 1;
  _date = _now.getDate();
  _hours = _now.getHours();
  _minutes = _now.getMinutes();
  _seconds = _now.getSeconds();
  appendzero = function(obj) {
    if (obj < 10) {
      return '0' + obj;
    }
    return obj;
  };
  _createDate = _year + '-' + appendzero(_month) + '-' + appendzero(_date);
  _createTime = appendzero(_hours) + ':' + appendzero(_minutes) + ':' + appendzero(_seconds);
  _timeStamp = _now.getTime();
  _speak = {
    content: req.body.content,
    meta: {
      createDate: _createDate,
      createTime: _createTime,
      timeStamp: _timeStamp
    }
  };
  return Speak.create(_speak, function(err) {
    var blog_host, info;
    if (err) {
      throw err;
    }
    blog_host = settings.blog_host;
    info = {
      'blog_host': blog_host
    };
    return res.render('admin/speak', info);
  });
};
