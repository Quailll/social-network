const { Thought, User } = require("../models");

module.exports = {
  getUser(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate('friends')
      .populate('thoughts')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body, },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "no user " });
        }
        res.json(user);
      })

      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if(!user){
          res.status(404).json({message: 'no user'})
        }
        return Thought.deleteMany({_id: {$in: user.thoughts}})
      })
      .then(()=> {
        res.json({message: 'user deleted'})
      })
      
      .catch((err) => res.status(500).json(err));
  },
  addFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$addToSet: {friends: req.params.friendId}}, { new: true})
      .then((user)=>{
        if(!user){
          return res.status(404).json({message: 'no user'})
        }
        res.json(user)
      })
      .catch((err)=> res.status(500).json(err))
  },
  deleteFriend(req, res) {
    User.findOneAndDelete({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, { new: true})
      .then((user)=>{
        if(!user){
          res.status(404).json({message: ' no user'})
        }
        res.json(user);
      })
      .catch((err)=> res.status(500).json(err))
  },
};
