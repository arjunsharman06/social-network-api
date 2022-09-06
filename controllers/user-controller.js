const { findById } = require('../models/User');
const { User, Thought } = require('./../models');

const userController = {
  // Get All User
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Get User By ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .then((userData) => {
        if (!userData) {
          res.status(400).json({ message: 'No matched User found' });
          return;
        }

        res.status(200).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Create a User
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => {
        res.status(201).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Update a User
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate({ _id: params.id }, body, {
      //return the updated value
      new: true,
    }).then((userData) => {
      if (!userData) {
        res.status(400).json({
          message: `No user found with the matching id = ${params.id}`,
        });
        return;
      }
      res.status(200).json(userData);
    });
  },
  // Delete a User
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }).then((userData) => {
      if (!userData) {
        res
          .status(400)
          .json({ message: `No User found associated with id = ${params.id}` });
      }

      return Thought.deleteMany({ _id: userData.thoughts }).then(
        (thoughtData) => {
          if (!thoughtData) {
            res.status(400).json({
              message: `No Thought found associated with id's = ${userData.thoughts}`,
            });
            return;
          }
          res.status(200).json(userData);
        }
      );
    });
  },

  // Add friend
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    ).then((friendData) => {
      if (!friendData) {
        res
          .status(400)
          .json({ message: `No User found with the ID={params.userId}` });
        return;
      }

      res.status(200).json(friendData);
    });
  },

  // Delete Friend
  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    ).then((friendData) => {
      if (!friendData) {
        res
          .status(400)
          .json({ message: `No User found with the ID={params.userId}` });
        return;
      }
      res.status(200).json(friendData);
    });
  },
};

module.exports = userController;
