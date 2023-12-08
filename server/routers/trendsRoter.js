const Router = require("express");
const trendsDecorator = require("../controllers/trendsDecorator");
const router = new Router();

router.post("/trends", trendsDecorator.newTrend);
router.get("/trends", trendsDecorator.allTrends);
router.put(
  "/trends/trend/:trendId/user/:userId",
  trendsDecorator.newNotInterestingTrend
);

module.exports = router;
