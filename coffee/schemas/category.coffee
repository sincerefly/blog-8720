mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.Types.ObjectId

CategorySchema = new Schema {
  name:
    unique: true
    type: String
}

CategoryModel = mongoose.model('Category', CategorySchema)
module.exports = CategoryModel
