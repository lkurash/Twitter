const db = require("../models");
const twitsController = require("./twitsController");
const { QueryTypes } = require("sequelize");
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

      const tweets = await twitsController.getPublicTwitsByUser(
        userId,
        limit,
        offset
      );

      const countTweets = await db.Twits.count({ where: { userId: userId } });

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

      const tweets = await twitsController.getTwitsForAuthUser(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Twits.count();

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async favoriteTwits(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;
      const user = decodeUser(request);
      const authUserId = user.id;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      checkUsersAuth(request, userId, next);

      const favorite_twits = await twitsController.getFavoriteTwitByUser(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Favorite_twits.count({
        where: { userId: userId },
      });

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: favorite_twits,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

    const tweets = await twitsController.getTwitsByUser(
      userId,
      authUserId,
      limit,
      offset
    );
    const countTweets = await Twits.count({ where: { userId: userId } });

    let isTwitsOnNextPage = countTweets - limit * list;

    return response.json({
      tweets: tweets,
      moreTwits: true ? isTwitsOnNextPage > 0 : false,
    });
  }

  async publicTweets(request, response, next) {
    try {
      let { limit, list } = request.query;

      limit = limit || 7;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await twitsController.gelAllTwits(limit, offset);

      const countTweets = await Twits.count();

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

      const tweets = await twitsController.getTwitsWithUserLikes(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Likes.count({
        where: { userId: userId },
      });

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

      const tweets = await twitsController.getTwitsByFollowingUsers(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.sequelize.query(
        `SELECT count("Twits"."id") AS "count"
      FROM "Twits" AS "Twits"
      LEFT OUTER JOIN "Users" AS "user" ON "Twits"."userId" = "user"."id"
      LEFT OUTER JOIN "Followings" AS "user->followings_user" ON ("user"."id" = "user->followings_user"."followUserId"
      and "user->followings_user"."userId" = ${userId})
      LEFT OUTER JOIN "Twits" AS "retwits" ON ("Twits"."id" = "retwits"."twitId" and "retwits"."userId" = ${userId})
      LEFT OUTER JOIN "Users" AS "twit_user" ON "Twits"."twitUserId" = "twit_user"."id"
      WHERE "user->followings_user"."userId" = ${userId} or "Twits"."userId" = ${userId} `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      );

      let isTwitsOnNextPage = countTweets[0].count - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

      const answers = await twitsController.getCommentsByUser(
        userId,
        limit,
        offset
      );

      const countTweets = await db.Comments.count({
        where: { userId: userId },
      });

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: answers,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
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

      const tweets = await twitsController.getUserTwitsWithMedia(
        userId,
        authUserId,
        limit,
        offset
      );

      const countTweets = await db.Twits.count({
        where: { userId: userId, img: { [Op.ne]: null } },
      });

      let isTwitsOnNextPage = countTweets - limit * list;

      return response.json({
        tweets: tweets,
        moreTwits: true ? isTwitsOnNextPage > 0 : false,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new TweetsConstructor();
