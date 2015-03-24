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
      type: String
    }
  ]
  category:
    type: ObjectId
    ref: 'Category'
  pv:
    type: Number
    default: 0
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
