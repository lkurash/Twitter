const Router = require("express");
const actionsTwitsController = require("../controllers/actionsTwitsController");
const router = new Router();

router.post(
  "/twit/:twitId/user/:userId/bookmarks",
  actionsTwitsController.createFavoriteTwitByUser
);
router.post(
  "/bookmarks/twit/:twitId/user/:userId",
  actionsTwitsController.deleteBookmark
);

// router.post(
//   "/twit/:twitId/user/:userId/comments",
//   actionsTwitsController.createCommentByUser
// );
router.put("/twit/:twitId/retwits", actionsTwitsController.getCountRetwits);

// router.put("/twit/:twitId/comments", actionsTwitsController.getCountComments);

module.exports = router;
