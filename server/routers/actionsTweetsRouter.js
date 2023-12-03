const Router = require("express");
const actionsTweetsController = require("../controllers/actionsTweetsController");
const router = new Router();

router.post(
  "/tweet/:tweetId/user/:userId/bookmarks",
  actionsTweetsController.createFavoriteTweetByUser
);
router.post(
  "/bookmarks/tweet/:tweetId/user/:userId",
  actionsTweetsController.deleteBookmark
);

// router.post(
//   "/tweet/:tweetId/user/:userId/comments",
//   actionsTweetsController.createCommentByUser
// );
router.put(
  "/tweet/:tweetId/retweets",
  actionsTweetsController.getCountRetweets
);

// router.put("/tweet/:tweetId/comments", actionsTweetsController.getCountComments);

module.exports = router;
