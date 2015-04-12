settings = require '../../settings.js'
Article = require '../schemas/article'
crypto = require 'crypto'

exports.login = (req, res) ->

  data = {
    'blog_host': settings.blog_host
  }

  if !req.session.user
    return res.render 'admin/login', data
  else
    #return res.redirect '/'
    req.session.user = null
    return res.jsonp req.session.user



exports.loginCheck = (req, res) ->

  _key = req.body.key

  md5 = crypto.createHash('md5')
  key = md5.update(req.body.key).digest('hex')

  if _key == 'only31031'
    req.session.user = key
    #return res.jsonp {'ok': key}
    return res.redirect '/admin'
  else
    return res.redirect '/login'


exports.logout = (req, res) ->

  if !req.session.user
    return res.render 'admin/login'
  else
    req.session.user = null
    return res.redirect '/'



exports.index = (req, res) ->

  blog_host = settings.blog_host

  info = {
    'blog_host': blog_host
  }

  if !req.session.user
    return res.redirect '/login'
  else
    return res.render 'admin/index', info


exports.archive = (req, res) ->

  blog_host = settings.blog_host

  info = {
    'blog_host': blog_host
  }

  if !req.session.user
    return res.redirect '/login'
  else
    #return res.render 'admin/archive', info

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
        return res.render 'admin/archive', data








