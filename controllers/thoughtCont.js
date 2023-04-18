const { Thought, User } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.body.thoughtId})
      .then((thoughts)=> res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts)=> {
        return User.findOneAndUpdate({_id: req.body.userId}, {$push: { thought: thoughts._id}}, {new: true})
      })
      .then((user)=>{
        if(!user){
          return res.status(404).json({message: 'thought was not found'})
        }
        res.json({message: 'thought was created'})
      })
      .catch((err)=>{ console.log(err); 
      res.status(500).json(err)});
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {upsert: true}, {new: true})
      .then((thoughts) => {
        if(!thoughts){
          return res.status(404).json({message: 'no thought '});
        }
        res.json(thoughts);
      })

      .catch((err) => res.status(500).json(err))
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) => {
      return User.findOneAndUpdate(
        {thought: req.params.thoughtId},
        {$pull: {thought: req.params.thoughtId}},
        {new: true}
      );
    })
    .then((user) => {
      if(!user){
        return res.status(404).json({message: 'no user'})
      }
      res.json({message: 'thought deleted'})
    })
      .catch((err) => res.status(500).json(err));
  },
  addReaction(req, res){
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reaction: req.body}}, {new: true})
      .then((thoughts)=> {
        if(!thoughts){
          return res.status(404).json({message: 'no thought'})
        }
        res.json(thoughts)
      })
      .catch((err)=> res.status(500).json(err))
  },
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thoughts) => {
        if (!thoughts) {
          return res.status(404).json({ message: "no thought" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  }
}