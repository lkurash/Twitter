const Router = require("express");
const trendsController = require("../controllers/trendsController");
const router = new Router();

router.post("/trends", trendsController.createTrends);
router.get("/trends", trendsController.getlAllTrends);
router.get("/trends/:trend", trendsController.getTrendsTwits);

module.exports = router;
