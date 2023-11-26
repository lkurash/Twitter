const Router = require("express");
const twitsController = require("../controllers/twitsController");
const tweetsConstructor = require("../controllers/tweetsConstructor");
const router = new Router();

router.post("/twit", twitsController.createTwitAndTrends);
router.get("/", tweetsConstructor.publicTweets);
router.get("/auth/user/:userId", tweetsConstructor.tweetsByUser);
router.get("/user/:userId", tweetsConstructor.publicTweetsByUser);
router.get("/user/:userId/bookmarks", tweetsConstructor.favoriteTwits);
router.get("/user/:userId/comments", tweetsConstructor.tweetsWithUserAnswers);
router.delete("/twit/:twitId", twitsController.deleteTwit);
router.get("/authUser/:userId", tweetsConstructor.tweetsForAuthUser);
router.get(
  "/following/user/:userId",
  tweetsConstructor.tweetsForAuthUserByFollowings
);
router.get("/user/:userId/media", tweetsConstructor.tweetsByUserWithMedia);
router.get("/likes/user/:userId", tweetsConstructor.tweetsWithUserLikes);
router.post(
  "/twit/:twitId/user/:userId/likes",
  twitsController.createLikeOnTwit
);
router.put(
  "/twit/:twitId/likes/user/:userId",
  twitsController.deleteLikeOnTwit
);
router.post(
  "/twit/:twitId/user/:userId/retwits",
  twitsController.createRetwitTweet
);
router.put(
  "/retwits/:retwitId/user/:userId",
  twitsController.deleteRetweetTweet
);

router.post(
  "/twit/:twitId/user/:userId/comments",
  twitsController.createAnswer
);

module.exports = router;
