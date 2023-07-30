const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/registration", userController.register);
router.post("/login", userController.authentication);
router.get("/auth", authMiddleware, userController.createRefreshToken);
router.put("/:id", userController.updateUserProfile);
router.get("", userController.getAllUsers);
router.get("/user/:name", userController.getSearchUsers);
router.get("/:id", userController.getUserById);
router.post("/:id/followings", userController.createFollowing);
router.delete("/:id/unfollow/:unfollowedId", userController.deleteFollowing);
router.get("/:id/followings", userController.getFollowingUsers);
router.get("/:id/followers", userController.getFollowerUsers);

module.exports = router;
