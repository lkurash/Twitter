const Router = require("express");
const pageController = require("../controllers/pageController");

const router = new Router();

router.get("/users/:userId", pageController.getUser);

module.exports = router;
