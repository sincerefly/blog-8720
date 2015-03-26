settings = require '../../settings.js'
Article = require '../schemas/article'
Category = require '../schemas/category'

# 根据标签获取文章列表
exports.getByTag = (req, res) ->

  _tag = req.params.tag
  console.log _tag

  Article.count {'tags': _tag}, (err, count) ->
    throw err if err
    _count = count

    Article
      .find {'tags': _tag}
      .select ('title content category tags pv meta.createDate meta.createTime meta.timeStamp')
      .populate {
        path: 'category'
        select: 'name -_id'
      }
      .sort ({'meta.timeStamp': -1})
      .exec (err, articles) ->
        throw err if err

        _articles = []

        # 因为不能直接修改查询返回的信息，所以重新构造数据
        for ar in articles
          _ar = {
            'title': ar.title,
            'content': ar.content.substring(0, 10),  # 首页每篇文章显示的字数
            'category': ar.content.category,
            'tags': ar.tags,
            'pv': ar.pv,
            'meta': {
              'createDate': ar.meta.createDate,
              'createTime': ar.meta.createTime,
              'timeStamp': ar.meta.timeStamp
            }
          }
          _articles.push(_ar)

        console.log _articles

        data = {
          'blog_title': settings.blog_title,
          'blog_description': settings.blog_description,
          'blog_host': settings.blog_host,
          'search_tag': _tag,
          'article_count': _count,
          'articles': _articles
        }
        return res.render 'tag', data




