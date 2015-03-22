settings = require '../../settings.js'

exports.HomePage= (req, res) ->
  tmp = {
    'blog_title': settings.blog_title,
    'blog_description': settings.blog_description,
    'haha': 'hello world',
    'test': 123
  }
  return res.render 'index', tmp
