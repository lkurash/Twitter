const ApiError = require("../error/ApiError");
const uuid = require("uuid");
const path = require("path");
const models = require('../models/index');

class TopicsController {
  async createTopic(request, response, next) {
    try {
      let { trend, title, info } = request.body;
      const topic = await models.Topics.create({ trend, title, info });

      return response.json(topic);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async gelAllTopics(request, response) {
    let { limit, page } = request.query;

    limit = limit || 5;
    page = page || 1;

    let offset = page * limit - limit;

    const topic = await models.Topics.findAll();

    return response.json(topic);
  }
}

module.exports = new TopicsController();
