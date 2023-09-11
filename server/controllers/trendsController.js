const ApiError = require("../error/ApiError");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const models = require("../models/index");
const dbRequestTwitsForAuthUser = require("../sql/dbRequestTwitsForAuthUser ");
const Twits = models.Twits;
const Trends = models.Trends;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_twits = models.Favorite_twits;
const Following = models.Following;
const jwt = require("jsonwebtoken");
const TwitsPresenter = require("../presenters/twitsPresenter");
const TwitsPresenterForPublicPage = require("../presenters/twitsPresenterForPublicPage");

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

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

          const checkTrends = await models.Trends.findOne({
            where: { title: word },
          });

          if (!checkTrends) {
            const trend = await models.Trends.create({
              trend: "Trend all over the world",
              title: word,
              count_twits: countTwits,
            });
          } else {
            await models.Trends.update(
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
      const trends = await Trends.findAll({
        where: {
          [Op.or]: [
            {
              "$notInteresting_trends.userId$": { [Op.ne]: +userId },
              "$notInteresting_trends.userId$": null,
            },
          ],
        },
        include: {
          model: models.NotInteresting_trends,
          as: "notInteresting_trends",
        },
        order: [["count_twits", "DESC"]],
        limit: limit,
        subQuery: false,
      });

      return response.json(trends);
    } else {
      const trends = await models.Trends.findAll({
        limit: limit,
        order: [["count_twits", "DESC"]],
      });

      return response.json(trends);
    }
  }

  async getTrendsTwitsForAuthUser(request, response) {
    const Op = Sequelize.Op;

    const { trend } = request.params;
    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const params = `WHERE "Twits"."text" LIKE '%${trend}%' ORDER BY "Twits"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const trends = await dbRequestTwitsForAuthUser(decodeUser, request, params);

    const presenter = new TwitsPresenter(trends);

    return response.json(presenter.toJSON());
  }

  async getPublicTrendsTwits(request, response) {
    const Op = Sequelize.Op;

    const { trend } = request.params;
    let { limit, list } = request.query;

    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const trends = await Twits.findAll({
      where: { text: { [Op.substring]: trend } },
      include: [
        { model: User, as: "user" },
        { model: User, as: "twit_user" },
      ],
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });

    const presenter = new TwitsPresenterForPublicPage(trends);

    return response.json(presenter.toJSON());
  }

  async createNotInterestingTrend(request, response) {
    const { userId, trendId } = request.params;

    const checkTrends = await models.NotInteresting_trends.findOne({
      where: { userId, trendId },
    });

    if (!checkTrends) {
      const notInterestingTrend = await models.NotInteresting_trends.create({
        trendId,
        userId,
      });
      return response.json(notInterestingTrend);
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
        console.log(countTwits);
        const checkTrends = await models.Trends.findOne({
          where: { title: word },
        });

        if (checkTrends) {
          if (countTwits === 0) {
            await models.Trends.destroy({ where: { title: word } });
          } else {
            await models.Trends.update(
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
