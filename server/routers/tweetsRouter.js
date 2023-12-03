const Router = require("express");
const tweetsController = require("../controllers/tweetsController");
const tweetsConstructor = require("../controllers/tweetsConstructor");
const router = new Router();

router.post("/tweet", tweetsController.createTweetAndTrends);
router.get("/", tweetsConstructor.publicTweets);
router.get("/auth/user/:userId", tweetsConstructor.tweetsByUser);
router.get("/user/:userId", tweetsConstructor.publicTweetsByUser);
router.get("/user/:userId/bookmarks", tweetsConstructor.favoriteTweets);
router.get("/user/:userId/comments", tweetsConstructor.tweetsWithUserAnswers);
router.delete("/tweet/:tweetId", tweetsController.deleteTweet);
router.get("/authUser/:userId", tweetsConstructor.tweetsForAuthUser);
router.get(
  "/following/user/:userId",
  tweetsConstructor.tweetsForAuthUserByFollowings
);
router.get("/user/:userId/media", tweetsConstructor.tweetsByUserWithMedia);
router.get("/likes/user/:userId", tweetsConstructor.tweetsWithUserLikes);
router.post(
  "/tweet/:tweetId/user/:userId/likes",
  tweetsController.createLikeOnTweet
);
router.put(
  "/tweet/:tweetId/likes/user/:userId",
  tweetsController.deleteLikeOnTweet
);
router.post(
  "/tweet/:tweetId/user/:userId/retweets",
  tweetsController.createRetweetTweet
);
router.put(
  "/retweets/:retweetId/user/:userId",
  tweetsController.deleteRetweetTweet
);

router.post(
  "/tweet/:tweetId/user/:userId/comments",
  tweetsController.createAnswer
);

module.exports = router;
