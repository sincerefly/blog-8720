settings = require '../../settings.js'

exports.needLogin = (req, res, next) ->

  if !req.session.user
    return res.redirect '/login'
  next()


exports.needNoLogin = (req, res, next) ->

  if req.session.user
    return res.redirect '/admin'
  next()
