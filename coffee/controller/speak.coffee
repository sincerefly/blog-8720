Speak = require '../schemas/speak'
Category = require '../schemas/category'
settings = require '../../settings.js'


# 获取文章归档信息
exports.getArchive = (req, res) ->

  Speak
    .find {}
    .select ('content meta.createDate meta.timeStamp')
    .sort ({'meta.timeStamp': -1})
    .limit 10
    .exec (err, speaks) ->
      throw err if err

      _speaks = []

      # 因为不能直接修改查询返回的信息，所以重新构造数据
      for speak in speaks
        _speak = {
          'content': speak.content
          'meta': {
            'createDate': speak.meta.createDate,
            'timeStamp': speak.meta.timeStamp,
          }
        }
        _speaks.push(_speak)

      console.log _speaks

      data = {
        'blog_title': settings.blog_title,
        'blog_description': settings.blog_description,
        'blog_host': settings.blog_host,
        'speaks': _speaks
      }
      return res.render 'speak', data



# 获取发布文章的表单
exports.getPostForm = (req, res) ->
  #console.log '------'
  blog_host = settings.blog_host

  info = {
    'blog_host': blog_host
  }

  return res.render 'admin/speak', info

# 发布说说
exports.post = (req, res) ->

  # 所需参数
  # title 文章标题 '我是文章的标题'
  # cotent 内容正文 '我是文章的内容'
  # category  分类目录 'category1'
  # tags 标签数组 'tags1,tags2,tags3'
  #

  # 获取分类目录的ObjectId

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
  _speak = {
    content:req.body.content,
    meta: {
      createDate: _createDate,
      createTime: _createTime,
      timeStamp: _timeStamp
    }
  }
  # 将文章存入数据库
  Speak.create _speak, (err) ->
    throw err if err

    blog_host = settings.blog_host

    info = {
      'blog_host': blog_host
    }
    #return res.jsonp {'status':'0', 'message': '保存文章成功'}
    return res.render 'admin/speak', info






