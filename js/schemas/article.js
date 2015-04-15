var ArticleModel, ArticleSchema, ObjectId, Schema, mongoose;

mongoose = require('mongoose');

Schema = mongoose.Schema;

ObjectId = Schema.Types.ObjectId;

ArticleSchema = new Schema({
  title: {
    unique: true,
    type: String
  },
  content: {
    type: String
  },
  tags: [
    {
      type: String
    }
  ],
  pv: {
    type: Number,
    "default": 0
  },
  meta: {
    createDate: {
      type: String
    },
    createTime: {
      type: String
    },
    timeStamp: {
      type: String
    }
  }
});

ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;
