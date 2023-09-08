const Router = require("express");
const twitsController = require("../controllers/twitsController");
const router = new Router();

router.post("/twit", twitsController.createTwitByUser);
router.get("/", twitsController.gelAllTwits);
router.get("/auth/user/:userId", twitsController.getTwitsByUser);
router.get("/user/:userId", twitsController.getPublicTwitsByUser);
router.get("/user/:userId/bookmarks", twitsController.getFavoriteTwitByUser);
router.get("/user/:userId/comments", twitsController.getCommentsByUser);
router.delete("/twit/:twitId", twitsController.deleteTwit);
router.get("/authUser/:userId", twitsController.getTwitsForAuthUser);
// router.get("/retwits/user/:userId", twitsController.getUserRetwits);
router.get("/following/user/:userId", twitsController.getTwitsByFollowingUsers);
router.get("/user/:userId/media", twitsController.getUserTwitsWithMedia);
router.get("/likes/user/:userId", twitsController.getTwitsWithUserLikes);

module.exports = router;
