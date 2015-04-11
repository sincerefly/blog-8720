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
    return res.jsonp {'ok': key}
  else
    return res.redirect '/'


exports.logout = (req, res) ->

  if !req.session.user
    return res.render 'admin/login'
  else
    req.session.user = null
    return res.redirect '/'





