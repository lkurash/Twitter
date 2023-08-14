const Router = require("express");
const actionsTwitsController = require("../controllers/actionsTwitsController");
const router = new Router();

router.post(
  "/twit/:twitId/user/:userId/likes",
  actionsTwitsController.createLikeTwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/bookmarks",
  actionsTwitsController.createFavoriteTwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/retwits",
  actionsTwitsController.createRetwitByUser
);
router.post(
  "/twit/:twitId/user/:userId/comments",
  actionsTwitsController.createCommentByUser
);
router.put("/twit/:twitId/retwits", actionsTwitsController.getCountRetwits);
router.put("/twit/:twitId/likes", actionsTwitsController.getCountLikes);
router.put("/twit/:twitId/comments", actionsTwitsController.getCountComments);

module.exports = router;
