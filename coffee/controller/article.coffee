Remarkable = require 'remarkable'
hljs = require 'highlight.js'
Article = require '../schemas/article'
Category = require '../schemas/category'
settings = require '../../settings.js'

fun = (str, lang) ->
    if lang and hljs.getLanguage(lang)
      try
        return hljs.highlight(lang, str).value
      catch err
        console.log err
    try
      return hljs.highlightAuto(str).value
    catch err
      console.log err
    return ''; # use external default escaping

md = new Remarkable({highlight: fun})


# 这段代码是原js代码，现已使用如上代码代替
#md = new Remarkable({
#  highlight: (str, lang) {
#    if (lang && hljs.getLanguage(lang)) {
#      try {
#        return hljs.highlight(lang, str).value;
#      } catch (err) {}
#    }
#
#    try {
#      return hljs.highlightAuto(str).value;
#    } catch (err) {}
#
#    return ''; # use external default escaping
#  }
#})


# 获取文章
exports.getById = (req, res) ->

  # 所需参数
  # 文章的id，也就是文章的时间戳
  _id = req.params.id
  console.log _id
  Article
    .findOne {'meta.timeStamp': _id}
    .select ('title content category tags pv meta.createDate meta.createTime meta.timeStamp')
    .populate {
      path: 'category'
      select: 'name -_id'
    }
    .exec (err, article) ->
      throw err if err
      console.log article

      Article.update {'_id': article._id}, {'$inc':{'pv': 1}}, (err) ->
        throw err if err

        #return res.jsonp {'status': 0, 'message': '获取文章并且pv+1成功', 'data': data}
        _article = article
        _article.content = md.render(_article.content)

        data = {
          'blog_title': settings.blog_title,
          'blog_description': settings.blog_description,
          'blog_host': settings.blog_host,
          'article': _article
        }
        return res.render 'article', data


# 获取10篇文章
exports.getTen = (req, res) ->

  # 获取请求的分页数
  page = if req.params.page then parseInt(req.params.page) else 1

  # settings中的一些设置
  _pageArticleCount = settings.page_article_num

  Article
    .find {}
    .select ('title content category tags pv meta.createDate meta.timeStamp')
    .populate {
      path: 'category'
      select: 'name -_id'
    }
    .sort ({'meta.timeStamp': -1})
    .skip (page - 1) *  _pageArticleCount
    .limit _pageArticleCount
    .exec (err, articles) ->
      throw err if err

      _articles = []

      # 因为不能直接修改查询返回的信息，所以重新构造数据
      for ar in articles
        con = ar.content.substring(0, settings.index_abstract_str_len)
        console.log con.replace('#', '')
        _ar = {
          'title': ar.title,
          'content': md.render(ar.content.substring(0, settings.index_abstract_str_len).replace('#', '')),  # 首页每篇文章显示的字数
          'category': ar.content.category,
          'tags': ar.tags,
          'pv': ar.pv,
          'meta': {
            'createDate': ar.meta.createDate,
            'timeStamp': ar.meta.timeStamp
          }
        }
        _articles.push(_ar)

      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'articles': _articles,
        'isFirstPage': (page - 1) == 0,
        #FIXME 如下的代码在最后一页文章数等于设置数时无法判断
        'isLastPage': _articles.length < _pageArticleCount,
        'page': page
      }
      return res.render 'index', data
      #return res.jsonp data


# 获取文章归档信息
exports.getArchive = (req, res) ->

  Article
    .find {}
    .select ('title content category tags pv meta.createDate meta.timeStamp')
    .populate {
      path: 'category'
      select: 'name -_id'
    }
    .sort ({'meta.timeStamp': -1})
    .exec (err, articles) ->
      throw err if err

      _articles = []

      # 因为不能直接修改查询返回的信息，所以重新构造数据
      for ar in articles
        _ar = {
          'title': ar.title,
          'meta': {
            'createDate': ar.meta.createDate,
            'timeStamp': ar.meta.timeStamp,
          }
        }
        _articles.push(_ar)

      console.log _articles


      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'articles': _articles
      }
      return res.render 'archive', data

# 根据日期获取文章
exports.getByDate = (req, res) ->

  # 所需参数
  # 文章的id，也就是文章的时间戳
  _month = req.params.month
  console.log _month

  query = new RegExp _month, 'i'

  Article.count {'meta.createDate': query}, (err, count) ->
    throw err if err
    _count = count

    Article
      .find {'meta.createDate': query}
      .select ('title content category tags pv meta.createDate meta.createTime meta.timeStamp')
      .populate {
        path: 'category'
        select: 'name -_id'
      }
      .sort ({'meta.timeStamp': -1})
      .exec (err, articles) ->
        throw err if err

        _articles = []

        # 因为不能直接修改查询返回的信息，所以重新构造数据
        for ar in articles
          _ar = {
            'title': ar.title,
            'content': ar.content.substring(0, 10),  # 首页每篇文章显示的字数
            'category': ar.content.category,
            'tags': ar.tags,
            'pv': ar.pv,
            'meta': {
              'createDate': ar.meta.createDate,
              'createTime': ar.meta.createTime,
              'timeStamp': ar.meta.timeStamp
            }
          }
          _articles.push(_ar)

        console.log _articles

        data = {
          'blog_title': settings.blog_title,
          'blog_description': settings.blog_description,
          'blog_host': settings.blog_host,
          'search_month': _month,
          'article_count': _count,
          'articles': _articles
        }
        return res.render 'month', data


# 获取发布文章的表单
exports.getPostForm = (req, res) ->
  #console.log '------'
  return res.render 'admin/post'

# 发布文章
exports.post = (req, res) ->

  # 所需参数
  # title 文章标题 '我是文章的标题'
  # cotent 内容正文 '我是文章的内容'
  # category  分类目录 'category1'
  # tags 标签数组 'tags1,tags2,tags3'
  #
  _category = req.body.category
  _tags = req.body.tags
  tag_list = _tags.split(',')

  # 获取分类目录的ObjectId
  Category.findOne {'name': _category}, {'_id': 1}, (err, id) ->
    throw err if err
    _id = id

    #console.log _id

    _now = new Date()
    _year = _now.getFullYear()
    _month = _now.getMonth() + 1
    _date = _now.getDate()
    _hours = _now.getHours()
    _minutes = _now.getMinutes()
    _seconds = _now.getSeconds()

    # 为日期补0函数
    appendzero = (obj) ->
      return '0' + obj if obj < 10
      return obj

    # 构造文章创建的日期（日期，时间，时间戳）
    _createDate = _year + '-' + appendzero(_month) + '-' + appendzero(_date)
    _createTime = appendzero(_hours) + ':' + appendzero(_minutes) + ':' + appendzero(_seconds)
    _timeStamp = _now.getTime()

    #console.log _createDate  # '2015-03-24'
    #console.log _createTime  # '10:36:00'
    #console.log _timeStamp   # '1427164560310'

    # 文章数据
    _article = {
      title: req.body.title,
      content:req.body.content,
      tags: tag_list,
      category: _id,
      pv: 0  # 访问量，默认为0
      meta: {
        createDate: _createDate,
        createTime: _createTime,
        timeStamp: _timeStamp
      }
    }
    # 将文章存入数据库
    Article.create _article, (err) ->
      throw err if err
      return res.jsonp {'status':'0', 'message': '保存文章成功'}
      #return res.render 'admin/post'






