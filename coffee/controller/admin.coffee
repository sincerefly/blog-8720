Article = require '../schemas/article'
Tag = require '../schemas/tag'

exports.getArticle = (req, res) ->
  return res.jsonp {'hello': 'world'}

exports.postArticle = (req, res) ->

  console.log req.body
  _tags = req.body.tags
  tag_list = _tags.split(',')
  console.log tag_list

  list = [
    {'nickname': '测试', 'encode': 'ceshi'},
    {'nickname': '故事', 'encode': 'gushi'}
  ]
#  for l in list

  #Tag.update {},  (err, docs) ->
    #throw err if err

  some = (req, res) ->
    console.log '123'
  for tag in list
    console.log '------'
    console.log tag.nickname
    console.log '------'
    Tag.collection.update {'nickname': tag.nickname}, {'nickname': tag.nickname , 'encode': tag.encode}, {'upsert': true}, some

  _article = {
    title: req.body.title,
    content:req.body.content,
  }
  Article.create _article, (err) ->
    throw err if err
    return res.jsonp {'ok': '123'}
