const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");
const trendsRouter = require("./trendsRoter");
const tweetsRouter = require("./tweetsRouter");
const actionsTweetsRouter = require("./actionsTweetsRouter");
const pageRouter = require("./pageRouter");

router.use("/users", userRouter);
router.use("/tweetter", trendsRouter);
router.use("/tweets", tweetsRouter);
router.use("/tweets", actionsTweetsRouter);
router.use("/page", pageRouter);

module.exports = router;
