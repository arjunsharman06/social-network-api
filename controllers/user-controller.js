const { User } = require('./../models');

const userController = {
  // Get All User
  getAllUser(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
      })
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
        res
          .status(400)
          .json({
            message: `No user found with the matching id = ${params.id}`,
          });
        return;
      }
      res.status(200).json(userData);
    });
  },
  // Delete a User
  deleteUser({ params }, res) {
    findOneAndDelete({ _id: params.id }).then((userData) => {
      if (!userData) {
        res
          .status(400)
          .json({ message: `No User found with the id = ${params.id}` });
        return;
      }
      res.status(200).json(userData);
    });
  },
};

module.exports = userController;
