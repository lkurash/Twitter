const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");
const trendsRouter = require("./trendsRoter");
const twitsRouter = require("./twitsRouter");
const actionsTwitsRouter = require("./actionsTwitsRouter");

router.use("/users", userRouter);
router.use("/twitter", trendsRouter);
router.use("/twits", twitsRouter);
router.use("/twits", actionsTwitsRouter);

module.exports = router;
