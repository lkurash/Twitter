const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");
const trendsRouter = require("./trendsRoter");
const tweetsRouter = require("./tweetsRouter");

router.use("/users", userRouter);
router.use("/twitter", trendsRouter);
router.use("/tweets", tweetsRouter);

module.exports = router;
