mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

ArticleSchema = new Schema {
  nickname:
    unique: true
    type: String
  enname:
    unique: true
    type: String
}

