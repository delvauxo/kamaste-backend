const authRouter = require('./auth-router');
const bodyRouter = require('./body-router');
const espaceRouter = require('./espace-router');

const router = require('express').Router();
router.use('/auth', authRouter);
router.use('/body', bodyRouter);
router.use('/espace', espaceRouter);

module.exports = router;