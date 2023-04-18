const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')
const thoughtSchema = new Schema (
  { 
    thoughtText: {type: String, require: true, minlength: 1, maxlength: 280,} ,
    username: {type: String, require: true,},
    reactions: [reactionSchema]
  }
  {
    toJSON: {getters: true}, id: false,
  });

thoughtSchema.virtual('reactionCount').get(()=>{
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;