const ApiError = require("../error/ApiError");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const models = require("../models/index");
const dbRequestTweetsForAuthUser = require("../sql/dbRequestTweetsForAuthUser ");
const Tweets = models.Tweets;
const Trends = models.Trends;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_tweets = models.Favorite_tweets;
const Following = models.Following;
const jwt = require("jsonwebtoken");
const TweetsPresenter = require("../presenters/tweetsPresenter");
const TweetsPresenterForPublicPage = require("../presenters/tweetsPresenterForPublicPage");

const decodeUser = (request) => {
  const token = request.headers.authorization.split(" ")[1];
  const decodeUser = jwt.decode(token);

  return decodeUser;
};

class TrendsController {
  async createTrends(text, response, next) {
    try {
      const Op = Sequelize.Op;
      const words = text.split(" ");

      words.forEach(async (word) => {
        if (word.length >= 4) {
          const countTweets = await Tweets.count({
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
              count_tweets: countTweets,
            });
          } else {
            await models.Trends.update(
              { count_tweets: countTweets },
              { where: { title: word } }
            );
          }
        }
      });

      return words;
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getlAllTrends(request, response, next) {
    try {
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
          order: [["count_tweets", "DESC"]],
          limit: limit,
          subQuery: false,
        });

        return response.json(trends);
      } else {
        const trends = await models.Trends.findAll({
          limit: limit,
          order: [["count_tweets", "DESC"]],
        });

        return response.json(trends);
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getTrendsTweetsForAuthUser(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const user = decodeUser(request);
      const authUserId = user.id;

      const { trend } = request.params;
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const params = `WHERE "Tweets"."text" LIKE '%${trend}%' ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

      const trends = await dbRequestTweetsForAuthUser(
        authUserId,
        authUserId,
        params
      );

      const countTweets = await Tweets.count({
        where: { text: { [Op.substring]: trend } },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      const presenter = new TweetsPresenter(trends);

      return response.json({
        tweets: presenter.toJSON(),
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getPublicTrendsTweets(request, response, next) {
    try {
      const Op = Sequelize.Op;

      const { trend } = request.params;
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const trends = await Tweets.findAll({
        where: { text: { [Op.substring]: trend } },
        include: [
          { model: User, as: "user" },
          { model: User, as: "tweet_user" },
        ],
        order: [["id", "DESC"]],
        limit: limit,
        offset: offset,
      });

      const countTweets = await Tweets.count({
        where: { text: { [Op.substring]: trend } },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      const presenter = new TweetsPresenterForPublicPage(trends);

      return response.json({
        tweets: presenter.toJSON(),
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createNotInterestingTrend(request, response, next) {
    try {
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
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getCountTrends(text) {
    try {
      const Op = Sequelize.Op;

      const words = text.split(" ");

      words.forEach(async (word) => {
        if (word.length >= 4) {
          const countTweets = await Tweets.count({
            where: {
              text: { [Op.substring]: word },
            },
          });

          const checkTrends = await models.Trends.findOne({
            where: { title: word },
          });

          if (checkTrends) {
            if (countTweets === 0) {
              await models.Trends.destroy({ where: { title: word } });
            } else {
              await models.Trends.update(
                { count_tweets: countTweets },
                { where: { title: word } }
              );
            }
          }
        }
      });

      return text;
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new TrendsController();
