const db = require("../models");
const tweetsController = require("./tweetsController");
const { QueryTypes } = require("sequelize");
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

const checkUsersAuth = (request, userId, next) => {
  const user = decodeUser(request);
  const userIdToken = user.id;

  if (userIdToken !== parseInt(userId)) {
    next(ApiError.badRequest(`Check authentication ${userId}`));
  }
};

class TweetsConstructor {
  async publicTweetsByUser(request, response, next) {
    try {
      const { userId } = request.params;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.getPublicTweetsByUser(
        userId,
        limit,
        offset
      );

      const countTweets = await db.Tweets.count({ where: { userId: userId } });

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsForAuthUser(request, response, next) {
    try {
      const { userId } = request.params;
      const user = decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.getTweetsForAuthUser(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Tweets.count();

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async favoriteTweets(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;
      const user = decodeUser(request);
      const authUserId = user.id;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      checkUsersAuth(request, userId, next);

      const favorite_tweets = await tweetsController.getFavoriteTweetByUser(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Favorite_tweets.count({
        where: { userId: userId },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: favorite_tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsByUser(request, response, next) {
    const { userId } = request.params;
    const user = decodeUser(request);
    const authUserId = user.id;

    let { limit, list } = request.query;
    limit = limit || 7;
    list = list || 1;
    let offset = list * limit - limit;

    const tweets = await tweetsController.getTweetsByUser(
      userId,
      authUserId,
      limit,
      offset
    );
    const countTweets = await Tweets.count({ where: { userId: userId } });

    let isTweetsOnNextPage = countTweets - limit * list;

    return response.json({
      tweets: tweets,
      moreTweets: true ? isTweetsOnNextPage > 0 : false,
    });
  }

  async publicTweets(request, response, next) {
    try {
      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.gelAllTweets(limit, offset);

      const countTweets = await Tweets.count();

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsWithUserLikes(request, response, next) {
    try {
      const { userId } = request.params;
      const user = decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.getTweetsWithUserLikes(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Likes.count({
        where: { userId: userId },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsForAuthUserByFollowings(request, response, next) {
    try {
      const { userId } = request.params;
      const user = decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.getTweetsByFollowingUsers(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.sequelize.query(
        `SELECT count("Tweets"."id") AS "count"
      FROM "Tweets" AS "Tweets"
      LEFT OUTER JOIN "Users" AS "user" ON "Tweets"."userId" = "user"."id"
      LEFT OUTER JOIN "Followings" AS "user->followings_user" ON ("user"."id" = "user->followings_user"."followUserId"
      and "user->followings_user"."userId" = ${userId})
      LEFT OUTER JOIN "Tweets" AS "retweets" ON ("Tweets"."id" = "retweets"."tweetId" and "retweets"."userId" = ${userId})
      LEFT OUTER JOIN "Users" AS "tweet_user" ON "Tweets"."tweetUserId" = "tweet_user"."id"
      WHERE "user->followings_user"."userId" = ${userId} or "Tweets"."userId" = ${userId} `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );

      let isTweetsOnNextPage = countTweets[0].count - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsWithUserAnswers(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const answers = await tweetsController.getCommentsByUser(
        userId,
        limit,
        offset
      );

      const countTweets = await db.Comments.count({
        where: { userId: userId },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: answers,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsByUserWithMedia(request, response, next) {
    try {
      const Op = Sequelize.Op;
      const { userId } = request.params;
      const user = decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await tweetsController.getUserTweetsWithMedia(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Tweets.count({
        where: { userId: userId, img: { [Op.ne]: null } },
      });

      let isTweetsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTweets: true ? isTweetsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new TweetsConstructor();
