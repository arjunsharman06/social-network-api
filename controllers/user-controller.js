const { User } = require('./../models');

const userController = {
  // Get All User
  getAllUser(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //Get User By ID
  getUserById({ id }, res) {
    User.findOne({ _id: id })
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
        // if (!userData) {
        //   res.status(404).json({ message: 'No User was created.' });
        //   return;
        // }
        res.status(201).json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // Update a User
  updateUser({ id, body }, res) {
    User.findByIdAndUpdate({ _id: id }, body, {
      //return the updated value
      new: true,
    }).then((userData) => {
      if (!userData) {
        res
          .status(400)
          .json({ message: `No user found with the matching id = ${id}` });
        return;
      }
      res.status(200).json(userData);
    });
  },
  // Delete a User
  deleteUser({ id }, res) {
    findOneAndDelete({ _id: id }).then((userData) => {
      if (!userData) {
        res.status(400).json({ message: `No User found with the id = ${id}` });
        return;
      }
      res.status(200).json(userData);
    });
  },
};

module.exports = userController;
