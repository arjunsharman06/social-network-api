const router = require('express').Router();
const {
  addReply,
  removeReply,
} = require('../../controllers/thought-controller');

//  /api/replies/<thoughtId>
router.route('/:thoughtId').post(addReply);

//  /api/replies/<thoughtId>/<id>
router.route('/:thoughtId/:id').delete(removeReply);

module.exports = router;
