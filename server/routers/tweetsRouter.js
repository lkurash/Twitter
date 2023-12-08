const Router = require("express");
const dbRequestTweets = require("../controllers/dbRequestTweets");
const tweetsDecorator = require("../controllers/tweetsDecorator");
const router = new Router();

router.post("/tweet", tweetsDecorator.newTweetAndTrend);
router.get("/", tweetsDecorator.publicTweets);
router.get("/auth/user/:userId", tweetsDecorator.tweetsByUser);
router.get("/user/:userId", tweetsDecorator.publicTweetsByUser);
router.get("/user/:userId/bookmarks", tweetsDecorator.favoriteTweets);
router.get("/user/:userId/comments", tweetsDecorator.tweetsWithUserAnswers);
router.delete("/tweet/:tweetId", tweetsDecorator.deletedTweet);
router.get("/authUser/:userId", tweetsDecorator.tweetsForAuthUser);
router.get(
  "/following/user/:userId",
  tweetsDecorator.tweetsForAuthUserByFollowings
);
router.get("/user/:userId/media", tweetsDecorator.tweetsByUserWithMedia);
router.get("/likes/user/:userId", tweetsDecorator.tweetsWithUserLikes);
router.post("/tweet/:tweetId/user/:userId/likes", tweetsDecorator.likedTweet);
router.put("/tweet/:tweetId/likes/user/:userId", tweetsDecorator.dislikeTweet);
router.post(
  "/tweet/:tweetId/user/:userId/retweets",
  tweetsDecorator.newRetweet
);
router.put("/retweets/:retweetId/user/:userId", tweetsDecorator.deleteRetweet);

router.post(
  "/tweet/:tweetId/user/:userId/comments",
  tweetsDecorator.newReplies
);

router.get("/trend/:trend", tweetsDecorator.publicTweetsForTrend);
router.get("/auth/trend/:trend", tweetsDecorator.authUserTweetsForTrend);
router.post(
  "/tweet/:tweetId/user/:userId/bookmarks",
  tweetsDecorator.newFavoriteTweet
);
router.post(
  "/bookmarks/tweet/:tweetId/user/:userId",
  tweetsDecorator.deletedFavoriteTweet
);

module.exports = router;
