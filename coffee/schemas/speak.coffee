mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

SpeakSchema = new Schema {
  content:
    type: String
  meta:
    createDate:
      type: String
    createTime:
      type: String
    timeStamp:
      type: String
}

SpeakModel = mongoose.model('Speak', SpeakSchema)
module.exports = SpeakModel
