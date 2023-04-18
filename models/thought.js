const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const dateAndTime = require('../utils/dateFormat')
const thoughtSchema = new Schema (
  { 
    thoughtText: {type: String, require: true, minlength: 1, maxlength: 280,} ,
    username: {type: String, require: true,},
    reactions: [reactionSchema],
    createdAt: {type: Date, default: Date.now, get: timestamp => timestamp.toLocaleDateString()},
  },
  {
    toJSON: {getters: true}, id: false,
  });

thoughtSchema.virtual('reactionCount').get(function (){
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;