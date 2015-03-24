var Article, Category;

Article = require('../schemas/article');

Category = require('../schemas/category');

exports.get = function(req, res) {
  return res.jsonp({
    'hello': 'world'
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
