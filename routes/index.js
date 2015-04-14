var express = require('express');
var router = express.Router();

/* 获取文档 */
var article = require('../js/controller/article.js');
var speak = require('../js/controller/speak.js');
var tag = require('../js/controller/tag.js');
var auth = require('../js/middleware/auth.js');
var admin = require('../js/controller/admin.js');

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
router.get('/t/:tag', tag.getByTag);

/* 说说相关 */
router.get('/speak', speak.getArchive);


/* Admin */

// 管理界面
router.get('/admin', auth.needLogin, admin.index);
router.get('/admin/archive', auth.needLogin, admin.archive);
// 发布文章
router.get('/admin/post',  auth.needLogin, article.getPostForm);
router.post('/admin/post', auth.needLogin, article.post);
// 编辑文章
router.get('/admin/edit/p/:id', auth.needLogin, article.edit);
router.post('/admin/edit/p/:id', auth.needLogin, article.rePost);
// 删除文章
// TODO
// 发布说说
router.get('/admin/speak', auth.needLogin, speak.getPostForm);
router.post('/admin/speak', auth.needLogin, speak.post);

// 管理员认证
router.get('/login', auth.needNoLogin, admin.login);
router.post('/login', auth.needNoLogin, admin.loginCheck);
router.get('/logout', auth.needLogin, admin.logout);


module.exports = router;


