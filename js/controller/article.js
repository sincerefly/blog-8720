var Article, Category, settings;

settings = require('../../settings.js');

Article = require('../schemas/article');

Category = require('../schemas/category');

exports.get = function(req, res) {
  var _id;
  _id = req.params.id;
  console.log(_id);
  return Article.findOne({
    'meta.timeStamp': _id
  }).select('title content category tags pv meta.createDate meta.createTime meta.timeStamp').populate({
    path: 'category',
    select: 'name -_id'
  }).exec(function(err, article) {
    if (err) {
      throw err;
    }
    console.log(article);
    return Article.update({
      '_id': article._id
    }, {
      '$inc': {
        'pv': 1
      }
    }, function(err) {
      var data;
      if (err) {
        throw err;
      }
      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'article': article
      };
      return res.render('article', data);
    });
  });
};

exports.getTen = function(req, res) {
  return Article.find({}).select('title content category tags pv meta.createDate meta.createTime meta.timeStamp').populate({
    path: 'category',
    select: 'name -_id'
  }).sort({
    'meta.timeStamp': -1
  }).limit(10).exec(function(err, articles) {
    var _ar, _articles, ar, data, i, len;
    if (err) {
      throw err;
    }
    _articles = [];
    for (i = 0, len = articles.length; i < len; i++) {
      ar = articles[i];
      _ar = {
        'title': ar.title,
        'content': ar.content.substring(0, 10),
        'category': ar.content.category,
        'tags': ar.tags,
        'pv': ar.pv,
        'meta': {
          'createDate': ar.meta.createDate,
          'createTime': ar.meta.createTime,
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
    return res.render('index', data);
  });
};

exports.post = function(req, res) {
  var _category, _tags, tag_list;
  _category = req.body.category;
  _tags = req.body.tags;
  tag_list = _tags.split(',');
  return Category.findOne({
    'name': _category
  }, {
    '_id': 1
  }, function(err, id) {
    var _article, _createDate, _createTime, _date, _hours, _id, _minutes, _month, _now, _seconds, _timeStamp, _year, appendzero;
    if (err) {
      throw err;
    }
    _id = id;
    console.log(_id);
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
    console.log(_createDate);
    console.log(_createTime);
    console.log(_timeStamp);
    _article = {
      title: req.body.title,
      content: req.body.content,
      tags: tag_list,
      category: _id,
      pv: 0,
      meta: {
        createDate: _createDate,
        createTime: _createTime,
        timeStamp: _timeStamp
      }
    };
    return Article.create(_article, function(err) {
      if (err) {
        throw err;
      }
      return res.jsonp({
        'status': '0',
        'message': '保存文章成功'
      });
    });
  });
};
