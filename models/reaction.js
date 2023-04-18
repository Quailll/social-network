const { Schema, Types } = require('mongoose')

const reactionSchema = new Schema(
  {
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    reactionBody: {type: String, require: true, maxlength: 280},
    username: {type: String, require: true,},
  },
  {
    toJSON: {virtuals: true}, id: false,
  }
);

module.exports = reactionSchema;