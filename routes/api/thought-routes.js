const router = require('express').Router();
const {
  getAllThought,
  getThoughtByID,
  createThough,
  updateThought,
  deleteThought,
  addReply,
  removeReply,
} = require('../../controllers/thought-controller');
const { route } = require('./user-routes');

//  /api/thoughts/
router.route('/').get(getAllThought);

// /api/thoughts/<userid>
router.route('/:userid').post(createThough);
router.route('/:id').get(getThoughtByID).put(updateThought);

//  /api/thoughts/<userid>/<thoughtid>
router.route('/:userid/:id').delete(deleteThought);

module.exports = router;
