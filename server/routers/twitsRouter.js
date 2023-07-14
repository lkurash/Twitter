const Router = require("express");
const twitsController = require("../controllers/twitsController");
const router = new Router();

router.post("/twit", twitsController.createTwitByUser);
router.get("", twitsController.gelAllTwits);
router.get("/user/:userId", twitsController.getTwitsByUser);
router.post(
  "/twit/:twitId/user/:userId/likes",
  twitsController.createLikeTwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/bookmarks",
  twitsController.createFavoriteTwitByUser
);
router.get(
  "/user/:userId/bookmarks",
  twitsController.getFavoriteTwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/retwits",
  twitsController.createRetwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/comments",
  twitsController.createCommentByUser
);
router.get(
  "/user/:userId/comments",
  twitsController.getCommentsByUser
);
router.get(
  "/user/:userId/retwits",
  twitsController.getRetwitsByUser
);
router.delete("/twit/:twitId", twitsController.deleteTwit);

module.exports = router;
