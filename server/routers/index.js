const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");
const topicsRouter = require("./topicsRoter");
const twitsRouter = require("./twitsRouter");
const actionsTwitsRouter = require("./actionsTwitsRouter");

router.use("/users", userRouter);
router.use("/twitter", topicsRouter);
router.use("/twits", twitsRouter);
router.use("/twits", actionsTwitsRouter);

module.exports = router;
