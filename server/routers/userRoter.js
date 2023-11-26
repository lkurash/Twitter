const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/registration", userController.register);
router.post("/login", userController.authentication);
router.get("/auth", authMiddleware, userController.createRefreshToken);
router.put("/:userId", userController.updateUserProfile);
router.get("", userController.getAllUsers);
router.get("/user/:name", userController.getSearchUsers);
router.get("/:userId", userController.getUserProfile);
router.post("/:userId/followings", userController.createFollowing);
router.delete(
  "/:userId/unfollow/:unfollowedId",
  userController.deleteFollowing
);
router.get("/:userId/followings", userController.getUserFollowings);
router.get(
  "/following/:userId",
  userController.getPreviewProfileAndCheckFollow
);
router.get("/:userId/followers", userController.getUserFollowers);
router.get("/:userId/nofollowings", userController.getWhoNotReadingUsers);

module.exports = router;
