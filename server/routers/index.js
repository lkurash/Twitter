const Router = require('express');
const router = new Router();
const userRouter = require('./userRoter');
const topicsRouter = require('./topicsRoter');
const twitsRouter = require('./twitsRouter');

router.use('/user', userRouter);
router.use('/twitter', topicsRouter);
router.use('/twits', twitsRouter);

module.exports = router;
