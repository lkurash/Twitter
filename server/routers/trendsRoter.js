const Router = require("express");
const trendsController = require("../controllers/trendsController");
const router = new Router();

router.post("/trends", trendsController.createTrends);
router.get("/trends", trendsController.getlAllTrends);
router.get("/auth/trends/:trend", trendsController.getTrendsTweetsForAuthUser);
router.get("/trends/:trend", trendsController.getPublicTrendsTweets);
router.get("/trends/:trend", trendsController.getTrendsTweetsForAuthUser);
router.put(
  "/trends/trend/:trendId/user/:userId",
  trendsController.createNotInterestingTrend
);

module.exports = router;
