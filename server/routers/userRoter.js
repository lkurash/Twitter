const Router = require("express");
const userDecorator = require("../controllers/userDecorator ");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/registration", userDecorator.register);
router.post("/login", userDecorator.authentication);
router.get("/auth", authMiddleware, userDecorator.createRefreshToken);
router.put("/:userId", userDecorator.newUserProfile);
router.get("", userDecorator.allUsers);
router.get("/user/:name", userDecorator.searchUsers);
router.get("/:userId", userDecorator.userProfile);
router.post("/:userId/followings", userDecorator.newFollowing);
router.delete(
  "/:userId/unfollow/:unfollowedId",
  userDecorator.deletedFollowing
);
router.get("/:userId/followings", userDecorator.userFollowings);
router.get("/following/:userId", userDecorator.previewProfile);
router.get("/:userId/followers", userDecorator.userFollowers);
router.get("/:userId/nofollowings", userDecorator.whoNotReadingUsers);

module.exports = router;
