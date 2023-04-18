const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
  username: { type: String, unique: true, require: true, trim: true },
  email: { type: String, unique: true, require: true, match: [/^([a-z\d])@([a-z])\.([a-z]{2, 6})$/]},
  thoughts: [{type: Schema.Types.ObjectId, ref: 'thought' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'user'}],
  },
  {
    toJSON:{virtuals: true,}, id: false,
  }
);

userSchema.virtual('friendCount').get(() => {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;