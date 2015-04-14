var Article, Category, Remarkable, Speak, fun, hljs, md, settings;

Remarkable = require('remarkable');

hljs = require('highlight.js');

Article = require('../schemas/article');

Category = require('../schemas/category');

Speak = require('../schemas/speak');

settings = require('../../settings.js');

fun = function(str, lang) {
  var err;
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (_error) {
      err = _error;
      console.log(err);
    }
  }
  try {
    return hljs.highlightAuto(str).value;
  } catch (_error) {
    err = _error;
    console.log(err);
  }
  return '';
};

md = new Remarkable({
  highlight: fun
});

exports.getById = function(req, res) {
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
      var _article, data;
      if (err) {
        throw err;
      }
      _article = article;
      _article.content = md.render(_article.content);
      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'article': _article
      };
      return res.render('article', data);
    });
  });
};

exports.getTen = function(req, res) {
  var _pageArticleCount, page;
  page = req.params.page ? parseInt(req.params.page) : 1;
  _pageArticleCount = settings.page_article_num;
  return Article.find({}).select('title content category tags pv meta.createDate meta.timeStamp').populate({
    path: 'category',
    select: 'name -_id'
  }).sort({
    'meta.timeStamp': -1
  }).skip((page - 1) * _pageArticleCount).limit(_pageArticleCount).exec(function(err, articles) {
    var _ar, _articles, ar, con, i, len;
    if (err) {
      throw err;
    }
    _articles = [];
    for (i = 0, len = articles.length; i < len; i++) {
      ar = articles[i];
      con = ar.content.substring(0, settings.index_abstract_str_len);
      console.log(con.replace('#', ''));
      _ar = {
        'title': ar.title,
        'content': md.render(ar.content.substring(0, settings.index_abstract_str_len).replace('#', '')),
        'category': ar.content.category,
        'tags': ar.tags,
        'pv': ar.pv,
        'meta': {
          'createDate': ar.meta.createDate,
          'timeStamp': ar.meta.timeStamp
        }
      };
      _articles.push(_ar);
    }
    return Speak.find({}).select('content meta.createDate meta.timeStamp').sort({
      'meta.timeStamp': -1
    }).limit(1).exec(function(err, speak) {
      var _speak, data;
      _speak = speak[0].content;
      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'speak': _speak,
        'articles': _articles,
        'isFirstPage': (page - 1) === 0,
        'isLastPage': _articles.length < _pageArticleCount,
        'page': page
      };
      return res.render('index', data);
    });
  });
};

exports.getArchive = function(req, res) {
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
    return res.render('archive', data);
  });
};

exports.getByDate = function(req, res) {
  var _month, query;
  _month = req.params.month;
  console.log(_month);
  query = new RegExp(_month, 'i');
  return Article.count({
    'meta.createDate': query
  }, function(err, count) {
    var _count;
    if (err) {
      throw err;
    }
    _count = count;
    return Article.find({
      'meta.createDate': query
    }).select('title content category tags pv meta.createDate meta.createTime meta.timeStamp').populate({
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
        'search_month': _month,
        'article_count': _count,
        'articles': _articles
      };
      return res.render('month', data);
    });
  });
};

exports.getPostForm = function(req, res) {
  var info;
  info = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'blog_host': settings.blog_host
  };
  return res.render('admin/post', info);
};

exports.edit = function(req, res) {
  var _id;
  _id = req.params.id;
  console.log(_id);
  return Article.find({
    'meta.timeStamp': _id
  }).select('title content category tags meta.createDate meta.createTime meta.timeStamp').exec(function(err, article) {
    var _article, info;
    if (err) {
      throw err;
    }
    _article = article[0];
    console.log(_article);
    info = {
      'blog_title': settings.blog_title,
      'blog_description': settings.blog_description,
      'blog_host': settings.blog_host,
      'article': _article
    };
    return res.render('admin/edit', info);
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
      var blog_host, info;
      if (err) {
        throw err;
      }
      blog_host = settings.blog_host;
      info = {
        'blog_host': blog_host
      };
      return res.render('admin/post', info);
    });
  });
};

exports.rePost = function(req, res) {
  var _category, _id, _tags, data, tag_list;
  _id = req.params.id;
  _category = req.body.category;
  _tags = req.body.tags;
  tag_list = _tags.split(',');
  data = {
    'title': req.body.title,
    'content': req.body.content
  };
  return Article.update({
    'meta.timeStamp': _id
  }, data, function(err, num) {
    if (err) {
      throw err;
    }
    console.log(num);
    return res.jsonp({
      'hello': 'world'
    });
  });
};
