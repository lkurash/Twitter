const Router = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.checkToken);
router.post("/profile", userController.updateUserProfile);
router.get('/home', userController.getUserInfoByEmail);
router.get("/allUsers", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/following", userController.createFollow);
router.post("/deleteFollowing", userController.deleteFollow);
router.get("/following/:id", userController.getFollowingUser);
router.get("/followers/:id", userController.getFollowersUser);

module.exports = router;
