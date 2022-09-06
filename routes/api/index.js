const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');
const replyRoutes = require('./reply-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

// add prefix of `/thoughts` to routes created in `thought-routes.js`
router.use('/thoughts', thoughtRoutes);

// add prefix of `/replies` to routes created in `reply-routes.js`
router.use('/replies', replyRoutes);

router.use((req, res) => {
  res.status(400).json({ err: 'No page found!!' });
});

module.exports = router;
