var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});

// Router
var article = require('../js/controller/article.js');
router.get('/', article.getTen);
router.get('/archive', article.getAll);
router.get('/:month', article.getByDate);

var test = require('../js/controller/test.js');
router.get('/test', test.hello);

module.exports = router;
