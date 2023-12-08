const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/index.js");
const models = require("../models/index");

const sqlRequestTweetsForAuthUser = require("../sql/sqlRequestTweetsForAuthUser.js");
const sqlRequestTweetsWithUserLikes = require("../sql/sqlRequestTweetsWithUserLikes.js");
const sqlRequestTweetsByFollowingUsers = require("../sql/sqlRequestTweetsByFollowingUsers.js");

const TweetsPresenterForPublicPage = require("../presenters/tweetsPresenterForPublicPage.js");
const TweetsPresenter = require("../presenters/tweetsPresenter.js");
const CommentsPresenter = require("../presenters/commentsPresenter.js");
const TweetsWithUserLikesPresenter = require("../presenters/tweetsWithUserLikesPresenter.js");

const ApiError = require("../error/ApiError.js");
const trendsDecorator = require("./trendsDecorator.js");
const dbRequestActionsTweet = require("./dbRequestActionsTweet.js");
const helpers = require("./helpers.js");
const sqlRequestCountTweetsForAuthUserByFollowings = require("../sql/sqlRequestCountTweetsForAuthUserByFollowings.js");

class DbRequestTweets {
  async createTweetByUser(text, file, userId, request, response, next) {
    try {
      if (file) {
        const { imgs } = request.files;
        let tweetImgs = [];

        if (Array.isArray(imgs)) {
          imgs.forEach((tweetImg) => {
            tweetImgs.push(helpers.createFileName(tweetImg));
          });
        } else {
          tweetImgs.push(helpers.createFileName(imgs));
        }

        const newTweet = await db.Tweets.create({
          text,
          img: tweetImgs.toString(),
          userId,
        });

        const tweet = await db.Tweets.findOne({
          include: [{ model: db.User, as: "user" }],
          where: { id: newTweet.id },
        });

        const presenter = new TweetsPresenter([tweet]);

        return presenter.toJSON();
      } else {
        const newTweet = await db.Tweets.create({ text, userId });

        const tweet = await db.Tweets.findOne({
          include: [{ model: db.User, as: "user" }],
          where: { id: newTweet.id },
        });

        const presenter = new TweetsPresenter([tweet]);

        return presenter.toJSON();
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createRetweetTweet(tweetId, userId, tweetUserId, text, img) {
    const retweet = await dbRequestActionsTweet.createRetweetByUser(
      tweetId,
      userId,
      tweetUserId,
      text,
      img
    );

    const countRetweet = await dbRequestActionsTweet.getCountRetweets(tweetId);

    const retweetTweet = await db.Tweets.findOne({
      include: [
        { model: db.User, as: "user" },
        { model: db.User, as: "tweet_user" },
        { model: db.Likes, as: "likes" },
        { model: db.Tweets, as: "retweets" },
        { model: db.Favorite_tweets, as: "favorite_tweets" },
        { model: db.Comments },
      ],
      where: { id: retweet.id },
    });

    const presenter = new TweetsPresenter([retweetTweet]);

    return presenter.toJSON();
  }

  async deleteRetweetTweet(retweetId, userId) {
    const deletedRetweet = await dbRequestActionsTweet.deleteRetweetByUser(
      retweetId,
      userId
    );

    const countRetweet = await dbRequestActionsTweet.getCountRetweets(
      deletedRetweet.tweetId
    );

    return {
      tweet: deletedRetweet,
      count: countRetweet ? countRetweet.countRetweets : 0,
    };
  }

  async getTweetsByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "Tweets"."userId" = ${userId} ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await sqlRequestTweetsForAuthUser(authUserId, params);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getPublicTweetsByUser(userId, limit, offset) {
    const tweets = await db.Tweets.findAll({
      order: [["id", "DESC"]],
      where: { userId: userId },
      include: [
        { model: db.User, as: "user" },
        { model: db.User, as: "tweet_user" },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new TweetsPresenterForPublicPage(tweets);

    return presenter.toJSON();
  }

  async getTweetsByFollowingUsers(userId, authUserId, limit, offset) {
    const params = `DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await sqlRequestTweetsByFollowingUsers(
      userId,
      authUserId,
      params
    );

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getAllTweets(limit, offset) {
    const tweets = await db.Tweets.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: db.User, as: "user" },
        { model: db.User, as: "tweet_user" },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new TweetsPresenterForPublicPage(tweets);

    return presenter.toJSON();
  }

  async getTweetsForAuthUser(userId, authUserId, limit, offset) {
    let order = `ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await sqlRequestTweetsForAuthUser(authUserId, order);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getFavoriteTweetByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "favorite_tweets"."userId" = ${userId} ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const favoriteTweets = await sqlRequestTweetsForAuthUser(
      authUserId,
      params
    );

    const presenter = new TweetsPresenter(favoriteTweets);

    return presenter.toJSON();
  }

  async getCommentsByUser(userId, limit, offset) {
    const coments = await db.Comments.findAll({
      where: { userId: userId },
      include: [
        {
          model: db.Tweets,
          include: [
            { model: db.User, as: "user" },
            { model: db.User, as: "tweet_user" },
          ],
        },
        {
          model: db.User,
          as: "user",
        },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new CommentsPresenter(coments);

    return presenter.toJSON();
  }

  async deleteTweet(tweetId) {
    const tweet = await db.Tweets.findOne({
      where: { id: tweetId },
    });

    if (tweet) {
      await db.Tweets.destroy({
        where: { id: tweetId },
      });

      await db.Likes.destroy({ where: { tweetId: tweetId } });

      await db.Comments.destroy({ where: { tweetId: tweetId } });

      await db.Favorite_tweets.destroy({ where: { tweetId: tweetId } });

      const countRetweet = await dbRequestActionsTweet.getCountRetweets(
        tweetId
      );

      const countLikes = await dbRequestActionsTweet.getCountLikes(tweetId);

      const countAnswers = await dbRequestActionsTweet.getCountComments(
        tweetId
      );

      const countTrends = await trendsDecorator.countTrends(tweet.text);

      return tweet;
    }
  }

  async getUserTweetsWithMedia(userId, authUserId, limit, offset) {
    const params = `WHERE "Tweets"."userId" = ${userId} AND "Tweets"."img" IS NOT NULL ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await sqlRequestTweetsForAuthUser(authUserId, params);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getTweetsWithUserLikes(userId, authUserId, limit, offset) {
    const params = `ORDER BY "Likes"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweetsWithLikes = await sqlRequestTweetsWithUserLikes(
      userId,
      authUserId,
      params
    );

    const presenter = new TweetsWithUserLikesPresenter(tweetsWithLikes);

    return presenter.toJSON();
  }

  async isTweetsOnNextList(limit, list, params) {
    const countTweets = await db.Tweets.count(params);

    let isTweetsOnNextPage = countTweets - limit * list;
    return true ? isTweetsOnNextPage > 0 : false;
  }

  async isFavoriteTweetsOnNextList(limit, list, params) {
    const countTweets = await db.Favorite_tweets.count(params);

    let isTweetsOnNextPage = countTweets - limit * list;
    return true ? isTweetsOnNextPage > 0 : false;
  }

  async isLikedTweetsOnNextList(limit, list, params) {
    const countTweets = await db.Likes.count(params);

    let isTweetsOnNextPage = countTweets - limit * list;
    return true ? isTweetsOnNextPage > 0 : false;
  }

  async isTweetsByFollowingsOnNextList(userId, limit, list, params) {
    const countTweets = await sqlRequestCountTweetsForAuthUserByFollowings(
      userId
    );
    let isTweetsOnNextPage = countTweets[0].count - limit * list;
    return true ? isTweetsOnNextPage > 0 : false;
  }

  async isAnswersOnNextList(limit, list, params) {
    const countTweets = await db.Comments.count(params);

    let isTweetsOnNextPage = countTweets - limit * list;
    return true ? isTweetsOnNextPage > 0 : false;
  }
}

const dbRequestTweets = new DbRequestTweets();

module.exports = new DbRequestTweets();
