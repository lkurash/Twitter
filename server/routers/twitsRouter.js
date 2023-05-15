const Router = require("express");
const twitsController = require("../controllers/twitsController");
const router = new Router();

router.post("/createtwit", twitsController.createTwitByUser);
router.get("/alltwits", twitsController.gelAllTwits);
router.get("/userTwits/:id", twitsController.getTwitsByUser);
router.post("/like", twitsController.createLikeTwitByUser);
router.post("/bookmarks", twitsController.createFavoriteTwitByUser);
router.get("/allUserBookmarks", twitsController.getFavoriteTwitByUser);
router.post("/retwit/", twitsController.createRetwitByUser);
router.post("/comment/", twitsController.createCommentByUser);
router.get("/allUserComments/:id", twitsController.getCommentsByUser);
router.get("/allUserRetwits/:id", twitsController.getRetwitsByUser);
router.post("/deleteTwit", twitsController.deleteTwit);

module.exports = router;
