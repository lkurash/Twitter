const Router = require('express');
const topicsController = require('../controllers/topicsController');
const router = new Router();

router.post('/topic', topicsController.createTopic);
router.get('/topics', topicsController.gelAllTopics);

module.exports = router;
