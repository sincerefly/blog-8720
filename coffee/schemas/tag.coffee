mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

TagSchema = new Schema {
  nickname:
    unique: true
    type: String
  encode:
    unique: true
    type: String
}

TagModule = mongoose.model('Tag', TagSchema)
module.exports = TagModule
