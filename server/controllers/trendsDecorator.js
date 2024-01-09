const ApiError = require("../error/ApiError.js");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

const models = require("../models/index");
const db = require("../models/index.js");

const sqlRequestTweetsForAuthUser = require("../sql/sqlRequestTweetsForAuthUser.js");

const TweetsPresenter = require("../presenters/tweetsPresenter.js");
const TweetsPresenterForPublicPage = require("../presenters/tweetsPresenterForPublicPage.js");
const helpers = require("./helpers.js");
const dbRequestTrends = require("./dbRequestTrends.js");
const Op = Sequelize.Op;

class TrendsDecorator {
  async newTrend(text, response, next) {
    try {
      const words = text.split(" ");

      words.forEach(async (word) => {
        if (word.length >= 4) {
          const countTweets = await dbRequestTrends.countTweetsForTrend(word);

          const checkedTrend = await dbRequestTrends.checkTrend({
            title: word,
          });

          if (!checkedTrend) {
            const newTrend = await dbRequestTrends.createTrend(countTweets, word);
          } else {
            await dbRequestTrends.countUpdateTrend(countTweets, word);
          }
        }
      });

      return words;
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async allTrends(request, response, next) {
    try {
      let { limit, userId } = request.query;

      limit = limit || 4;

      if (userId) {
        const trends = await dbRequestTrends.getTrendsForAuthUser(
          userId,
          limit
        );

        return response.json(trends);
      } else {
        const trends = await dbRequestTrends.getPublicTrends(limit);

        return response.json(trends);
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getAuthUserTweetsForTrend(authUserId, trend, limit, offset) {
    try {
      const tweets = await dbRequestTrends.getAuthUserTweetsForTrend(
        authUserId,
        trend,
        limit,
        offset
      );
      const presenter = new TweetsPresenter(tweets);

      return presenter.toJSON();
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async getPublicTrendsTweets(trend, limit, offset) {
    try {
      const tweets = await dbRequestTrends.getPublicTweetsForTrend(
        trend,
        limit,
        offset
      );

      const presenter = new TweetsPresenterForPublicPage(tweets);

      return presenter.toJSON();
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async newNotInterestingTrend(request, response, next) {
    try {
      const { userId, trendId } = request.params;

      const newNotInterestingTrend =
        await dbRequestTrends.createNotInterestingTrend(userId, trendId);

      return response.json(newNotInterestingTrend);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async countTrends(text) {
    try {
      const words = text.split(" ");

      words.forEach(async (word) => {
        if (word.length >= 4) {
          const countTweets = await dbRequestTrends.countTweetsForTrend(word);

          const checkedTrend = await dbRequestTrends.checkTrend({
            title: word,
          });

          if (checkedTrend) {
            if (countTweets === 0) {
              dbRequestTrends.deleteTrend({ title: word });
            } else {
              await dbRequestTrends.countUpdateTrend(countTweets, word);
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

module.exports = new TrendsDecorator();
