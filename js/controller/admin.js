var Article, Tag;

Article = require('../schemas/article');

Tag = require('../schemas/tag');

exports.getArticle = function(req, res) {
  return res.jsonp({
    'hello': 'world'
  });
};

exports.postArticle = function(req, res) {
  var _article, _tags, i, len, list, some, tag, tag_list;
  console.log(req.body);
  _tags = req.body.tags;
  tag_list = _tags.split(',');
  console.log(tag_list);
  list = [
    {
      'nickname': '测试',
      'encode': 'ceshi'
    }, {
      'nickname': '故事',
      'encode': 'gushi'
    }
  ];
  some = function(req, res) {
    return console.log('123');
  };
  for (i = 0, len = list.length; i < len; i++) {
    tag = list[i];
    console.log('------');
    console.log(tag.nickname);
    console.log('------');
    Tag.collection.update({
      'nickname': tag.nickname
    }, {
      'nickname': tag.nickname,
      'encode': tag.encode
    }, {
      'upsert': true
    }, some);
  }
  _article = {
    title: req.body.title,
    content: req.body.content
  };
  return Article.create(_article, function(err) {
    if (err) {
      throw err;
    }
    return res.jsonp({
      'ok': '123'
    });
  });
};
