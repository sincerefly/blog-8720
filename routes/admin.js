var express = require('express');
var router = express.Router();

var admin = require('../js/controller/admin.js');
router.get('/article', admin.getArticle);
router.post('/article', admin.postArticle);

module.exports = router;
