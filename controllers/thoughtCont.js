const { Thought, User } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId})
      .then((thought)=> res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought)=> {
        return User.findOneAndUpdate({_id: req.params.userId}, {$push: { thoughts: thoughts._id}}, {new: true})
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
      .then((thought) => {
        if(!thought){
          return res.status(404).json({message: 'no thought '});
        }
        res.json(thought);
      })

      .catch((err) => res.status(500).json(err))
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
      return User.findOneAndUpdate(
        {thought: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
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
    Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$addToSet: {reactions: req.body}}, {new: true})
      .then((thought)=> {
        if(!thought){
          return res.status(404).json({message: 'no thought'})
        }
        res.json(thought)
      })
      .catch((err)=> res.status(500).json(err))
  },
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "no thought" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  }
}