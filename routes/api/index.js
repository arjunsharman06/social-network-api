const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of `/users` to routes created in `user-routes.js`
router.use('/users', userRoutes);

router.use((req, res) => {
  res.status(400).json({ err: 'No page found!!' });
});

module.exports = router;
