const router = require('express').Router();
const apiRouter = require('./api');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRouter);

module.exports = router;
