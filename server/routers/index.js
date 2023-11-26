const Router = require("express");
const router = new Router();
const userRouter = require("./userRoter");
const trendsRouter = require("./trendsRoter");
const twitsRouter = require("./twitsRouter");
const actionsTwitsRouter = require("./actionsTwitsRouter");
const pageRouter = require("./pageRouter");

router.use("/users", userRouter);
router.use("/twitter", trendsRouter);
router.use("/twits", twitsRouter);
router.use("/twits", actionsTwitsRouter);
router.use("/page", pageRouter);

module.exports = router;
