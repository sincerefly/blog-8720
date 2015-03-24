var express = require('express');
var router = express.Router();

var article = require('../js/controller/article.js');
router.get('/:id', article.get);
router.post('/', article.post);

module.exports = router;
