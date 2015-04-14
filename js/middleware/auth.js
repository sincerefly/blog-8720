var settings;

settings = require('../../settings.js');

exports.needLogin = function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  return next();
};

exports.needNoLogin = function(req, res, next) {
  if (req.session.user) {
    return res.redirect('/admin');
  }
  return next();
};
