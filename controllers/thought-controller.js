const { Thought, User } = require('../models');

const thoughtController = {
  // Get All thoughts
  getAllThought(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((thoughtData) => {
        res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   Get Thought by ID
  getThoughtByID({ params }, res) {
    Thought.findById({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res
          .status(400)
          .json({ message: `No thought found with the ${params.id}` });
        return;
      }
      res.status(200).json(thoughtData);
    });
  },

  //   Create a Thought
  createThough({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userid },
          // using the $push method to add the thought's _id to the specific user
          { $push: { thoughts: _id } },
          { new: true } //Returns the updated value of user
        );
      })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No Thought found with this id = ${params.userid}!`,
          });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  //  Update a Thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      //return the updated value
      new: true,
      runValidators: true,
    }).then((thoughtData) => {
      if (!thoughtData) {
        res.json({
          message: `No thought found with the associated  id = ${params.id}`,
        });
      }
      res.status(200).json(thoughtData);
    });
  },

  // Delete a Thought
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete({ _id: params.id }).then((thoughtData) => {
      if (!thoughtData) {
        res.status(404).json({
          message: `No Thought found with this id = ${params.id}!`,
        });
        return;
      }
      return User.findByIdAndUpdate(
        { _id: params.userid },
        { $pull: { thoughts: params.id } },
        { new: true }
      ).then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: `No User found with this id = ${params.userid}!`,
          });
          return;
        }
        res.status(200).json(userData);
      });
    });
  },

  // Add reply
  addReply({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({
            message: `No Thought is  assoicated with the id = ${params.thoughtId}`,
          });
          return;
        }
        res.json(thoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove reply
  removeReply({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionID: params.id } } },
      { new: true }
    )
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
