const Router = require("express");
const trendsController = require("../controllers/trendsController");
const router = new Router();

router.post("/trends", trendsController.createTrends);
router.get("/trends", trendsController.getlAllTrends);
router.get("/auth/trends/:trend", trendsController.getTrendsTwitsForAuthUser);
router.get("/trends/:trend", trendsController.getPublicTrendsTwits);
router.get("/trends/:trend", trendsController.getTrendsTwitsForAuthUser);
router.put(
  "/trends/trend/:trendId/user/:userId",
  trendsController.createNotInterestingTrend
);

module.exports = router;
