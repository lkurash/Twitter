const ApiError = require("../error/ApiError");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const models = require("../models/index");
const Twits = models.Twits;
const Trends = models.Topics;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;

class TrendsController {
  async createTrends(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { text } = request.body;

      const words = text.split(" ");

      words.forEach(async (word) => {
        if (word.length >= 4) {
          const countTwits = await Twits.count({
            where: {
              text: { [Op.substring]: word },
            },
          });

          const checkTrends = await models.Topics.findOne({
            where: { title: word },
          });

          if (!checkTrends) {
            const trend = await models.Topics.create({
              trend: "Trend all over the world",
              title: word,
              count_twits: countTwits,
            });
          } else {
            await models.Topics.update(
              { count_twits: countTwits },
              { where: { title: word } }
            );
          }
        }
      });
      return response.json(words);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getlAllTrends(request, response) {
    const Op = Sequelize.Op;
    let { limit, userId } = request.query;

    limit = limit || 4;

    if (userId) {
      const notInterestingTrends = await models.Topics.findAll({
        attributes: ["id"],
        order: [["count_twits", "DESC"]],
        where: {
          notinteresting_for_users: { [Op.substring]: userId },
        },
      });

      const idsNotInterestingTrends = [];

      if (notInterestingTrends) {
        notInterestingTrends.map((item) => {
          return idsNotInterestingTrends.push(item.id);
        });
      }

      const trends = await models.Topics.findAll({
        limit: limit,
        order: [["count_twits", "DESC"]],
        where: {
          id: { [Op.notIn]: idsNotInterestingTrends },
        },
      });

      return response.json(trends);
    } else {
      const trends = await models.Topics.findAll({
        limit: limit,
        order: [["count_twits", "DESC"]],
      });

      return response.json(trends);
    }
  }

  async getTrendsTwits(request, response) {
    const Op = Sequelize.Op;

    const { trend } = request.params;
    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const trends = await Twits.findAll({
      where: {
        text: { [Op.substring]: trend },
      },
      include: [
        { model: User, as: "user" },
        { model: Twits, as: "originalTwit" },
        { model: User, as: "twitUser" },
        { model: Likes },
        { model: Favorite_twits },
        { model: Comments },
      ],
      limit: limit,
      offset: offset,
    });

    return response.json(trends);
  }

  async createNotInterestingTrend(request, response) {
    const Op = Sequelize.Op;
    const { userId, trendId } = request.params;

    const trend = await models.Topics.findOne({ where: { id: trendId } });

    if (trend) {
      const idsUsers = await models.Topics.findAll({
        where: { id: trendId },
        attributes: ["notinteresting_for_users"],
      });

      const ids = [];

      if (idsUsers) {
        idsUsers.map((item) => {
          if (item.notinteresting_for_users !== null) {
            return ids.push(item.notinteresting_for_users);
          }
        });
      }

      if (!ids.includes(userId)) {
        ids.push(userId);

        const trend = await models.Topics.update(
          {
            notinteresting_for_users: ids.toString(),
          },
          {
            where: { id: trendId },
          }
        );
      }
      return response.json(trend);
    }
  }

  async getCountTrends(request, response) {
    const Op = Sequelize.Op;
    const { text } = request.body;

    const words = text.split(" ");

    words.forEach(async (word) => {
      if (word.length >= 4) {
        const countTwits = await Twits.count({
          where: {
            text: { [Op.substring]: word },
          },
        });

        const checkTrends = await models.Topics.findOne({
          where: { title: word },
        });

        if (checkTrends) {
          if (countTwits === 0) {
            await models.Topics.destroy({ where: { title: word } });
          } else {
            await models.Topics.update(
              { count_twits: countTwits },
              { where: { title: word } }
            );
          }
        }
      }
    });

    return response.json(text);
  }
}

module.exports = new TrendsController();
