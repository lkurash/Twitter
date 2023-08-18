const Router = require("express");
const twitsController = require("../controllers/twitsController");
const router = new Router();

router.post("/twit", twitsController.createTwitByUser);
router.get("/", twitsController.gelAllTwits);
router.get("/user/:userId", twitsController.getTwitsByUser);
router.get("/user/:userId/bookmarks", twitsController.getFavoriteTwitByUser);
router.get("/user/:userId/comments", twitsController.getCommentsByUser);
router.delete("/twit/:twitId", twitsController.deleteTwit);
router.get("/likes/user/:userId", twitsController.getTwitsWithUsersLike);
router.get("/retwits/user/:userId", twitsController.getUserRetwits);
router.get("/following/user/:userId", twitsController.getTwitsByFollowingUsers);
router.get("/user/:userId/media", twitsController.getUserTwitsWithMedia);

module.exports = router;
