mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

ArticleSchema = new Schema {
  title:
    unique: true
    type: String
  content:
    type: String
  tags: [
    {
      type: ObjectId
      ref: 'Tag'
    }
  ]
  catalogue:
    type: ObjectId
    ref: 'Catalogue'
  meta:
    createDate:
      type: String
    createTime:
      type: String
    timeStamp:
      type: String
}

ArticleModel = mongoose.model('Article', ArticleSchema)
module.exports = ArticleModel
