const ApiError = require("../error/ApiError");
const { Topics, Topics_info } = require("../models/models");
const uuid = require("uuid");
const path = require("path");

class TopicsController {
  async createTopic(request, response, next) {
    try {
      let { trend, title, info } = request.body;
      const topic = await Topics.create({ trend, title, info });

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

    const topics = await Topics.findAndCountAll({ limit, offset });

    return response.json(topics);
  }
}

module.exports = new TopicsController();
