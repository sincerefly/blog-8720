var express = require('express');
var router = express.Router();

var tag = require('../js/controller/tag.js');
router.get('/:tag', tag.getByTag);

module.exports = router;
