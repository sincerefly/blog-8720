var express = require('express');
var router = express.Router();

/* 获取文档 */
var article = require('../js/controller/article.js');
// 根据settings中的设置，获取指定数量的文档集合(首页)
router.get('/', article.getTen);
// 根据页码获取文章集合
router.get('/page/:page', article.getTen);
// 获取文章归档
router.get('/archive', article.getArchive);
// 根据年月日获取文章归档(暂时未使用)
router.get('/date/:month', article.getByDate);
// 根据文章的ID获取文章
router.get('/p/:id', article.getById);

/* 标签相关 */
var tag = require('../js/controller/tag.js');
router.get('/t/:tag', tag.getByTag);

/* Admin */
// 发布文章页面
router.get('/admin/post', article.getPostForm);
router.post('/admin/post', article.post);

var admin = require('../js/controller/admin.js');
router.get('/login', admin.login);
router.post('/login', admin.loginCheck);
router.get('/logout', admin.logout);

module.exports = router;


