const { User } = require('../models');

module.exports = {

  addFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id.' })
          : res.json({message: `Added friend to friend list.`})
      )
      .catch((err) => res.status(500).json(err));
  },
  
  removeFriend(req, res) {
    User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with this id.' })
          : res.json({message: `Removed friend from friend list.`})
      )
      .catch((err) => res.status(500).json(err));
  },
};