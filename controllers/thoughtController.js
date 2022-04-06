const { User, Thought } = require("../models");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this ID." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Thought created successfully. No user found with this username.',
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete( req.params.thoughtId )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought found with this ID.' })
          :  res.json({ message: 'This thought has been deleted.' })
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findByIdAndUpdate(req.params.thoughtId,
        req.body, 
        { runValidators: true, new: true })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID.' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
