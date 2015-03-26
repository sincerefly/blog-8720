var Article, Category, settings;

settings = require('../../settings.js');

Article = require('../schemas/article');

Category = require('../schemas/category');

exports.getByTag = function(req, res) {
  var _tag;
  _tag = req.params.tag;
  console.log(_tag);
  return Article.count({
    'tags': _tag
  }, function(err, count) {
    var _count;
    if (err) {
      throw err;
    }
    _count = count;
    return Article.find({
      'tags': _tag
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
        'search_tag': _tag,
        'article_count': _count,
        'articles': _articles
      };
      return res.render('tag', data);
    });
  });
};
