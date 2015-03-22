var settings;

settings = require('../../settings.js');

exports.HomePage = function(req, res) {
  var articles, data;
  articles = [
    {
      'title': '文章标题1',
      'content': '文章内容1'
    }, {
      'title': '文章标题2',
      'content': '文章内容2'
    }
  ];
  data = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'articles': articles
  };
  return res.render('index', data);
};
