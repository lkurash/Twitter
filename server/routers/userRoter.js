const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.checkToken);
router.put("/:id", userController.updateUserProfile);
router.get("", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/:id/followings", userController.createFollow);
router.delete("/:id/unfollow/:unfollowedId", userController.deleteFollow);
router.get("/:id/followings", userController.getFollowingUser);
router.get("/:id/followers", userController.getFollowersUser);

module.exports = router;
