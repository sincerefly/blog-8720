var express = require('express');
var router = express.Router();

/* GET home page. */
// Router
var article = require('../js/controller/article.js');
router.get('/', article.getTen);
router.get('/archive', article.getAll);
router.get('/date/:month', article.getByDate);

var test = require('../js/controller/test.js');
router.get('/test', test.hello);

module.exports = router;
