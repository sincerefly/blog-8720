var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});

// Router
var main = require('../js/controller/main.js');
router.get('/', main.HomePage);

var test = require('../js/controller/test.js');
router.get('/test', test.hello);

module.exports = router;
