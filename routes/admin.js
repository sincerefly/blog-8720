var express = require('express');
var router = express.Router();

var article = require('../js/controller/article.js');
router.get('/post', article.getPostForm);
router.post('/post', article.post);

module.exports = router;
