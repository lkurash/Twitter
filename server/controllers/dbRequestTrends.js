const sqlRequestTweetsForAuthUser = require("../sql/sqlRequestTweetsForAuthUser.js");
const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

class DbRequestTrends {
  async createTrend(countTweets, word) {
    const trend = await db.Trends.create({
      trend: "Trend all over the world",
      title: word,
      count_tweets: countTweets,
    });
    return trend;
  }

  async countTweetsForTrend(word) {
    const countTweetsForTrend = await db.Tweets.count({
      where: {
        text: { [Op.substring]: word },
      },
    });
    return countTweetsForTrend;
  }

  async checkTrend(params) {
    const trend = await db.Trends.findOne({
      where: params,
    });
    return trend;
  }

  async deleteTrend(params) {
    const deletedTrend = await db.Trends.destroy({ where: params });
    return deletedTrend;
  }

  async countUpdateTrend(countTweets, word) {
    return await db.Trends.update(
      { count_tweets: countTweets },
      { where: { title: word } }
    );
  }

  async checkNotInterestingTrend(userId, trendId) {
    const checkTrend = await db.NotInteresting_trends.findOne({
      where: { userId, trendId },
    });
    return checkTrend;
  }

  async createNotInterestingTrend(userId, trendId) {
    const checkNotInterestingTrend =
      await dbRequestTrends.checkNotInterestingTrend(userId, trendId);

    if (!checkNotInterestingTrend) {
      const newNotInterestingTrend = await db.NotInteresting_trends.create({
        trendId,
        userId,
      });

      return newNotInterestingTrend;
    }
  }

  async getTrendsForAuthUser(userId, limit) {
    const trends = await db.Trends.findAll({
      where: {
        [Op.or]: [
          {
            "$notInteresting_trends.userId$": { [Op.ne]: +userId },
            "$notInteresting_trends.userId$": null,
          },
        ],
      },
      include: {
        model: db.NotInteresting_trends,
        as: "notInteresting_trends",
      },
      order: [["count_tweets", "DESC"]],
      limit: limit,
      subQuery: false,
    });
    return trends;
  }

  async getPublicTrends(limit) {
    const trends = await db.Trends.findAll({
      limit: limit,
      order: [["count_tweets", "DESC"]],
    });
    return trends;
  }

  async getAuthUserTweetsForTrend(authUserId, trend, limit, offset) {
    const params = `WHERE "Tweets"."text" LIKE '%${trend}%' ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await sqlRequestTweetsForAuthUser(authUserId, params);

    return tweets;
  }

  async getPublicTweetsForTrend(trend, limit, offset) {
    const params = `WHERE "Tweets"."text" LIKE '%${trend}%' ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await db.Tweets.findAll({
      where: { text: { [Op.substring]: trend } },
      include: [
        { model: db.User, as: "user" },
        { model: db.User, as: "tweet_user" },
      ],
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return tweets;
  }
}

const dbRequestTrends = new DbRequestTrends();
module.exports = new DbRequestTrends();
