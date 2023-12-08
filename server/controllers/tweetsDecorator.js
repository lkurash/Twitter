const db = require("../models");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

const models = require("../models/index");

const ApiError = require("../error/ApiError");
const dbRequestTweets = require("./dbRequestTweets");
const helpers = require("./helpers");

const sqlRequestTweetsForAuthUser = require("../sql/sqlRequestTweetsForAuthUser.js");

const TweetsPresenter = require("../presenters/tweetsPresenter");
const TweetsPresenterForPublicPage = require("../presenters/tweetsPresenterForPublicPage");
const sqlRequestCountTweetsForAuthUserByFollowings = require("../sql/sqlRequestCountTweetsForAuthUserByFollowings");
const trendsDecorator = require("./trendsDecorator");
const dbRequestActionsTweet = require("./dbRequestActionsTweet");
const Op = Sequelize.Op;

class TweetsDecorator {
  constructor() {}
  async publicTweetsByUser(request, response, next) {
    try {
      const { userId } = request.params;

      let { limit, list } = request.query;
      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getPublicTweetsByUser(
        userId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
        limit,
        list,
        { where: { userId: userId } }
      );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsForAuthUser(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;

      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getTweetsForAuthUser(
        userId,
        authUserId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
        limit,
        list
      );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async favoriteTweets(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;
      const user = helpers.decodeUser(request);
      const authUserId = user.id;

      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      helpers.checkUsersAuth(request, userId, next);

      const favorite_tweets = await dbRequestTweets.getFavoriteTweetByUser(
        userId,
        authUserId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isFavoriteTweetsOnNextList(
        limit,
        list,
        {
          where: { userId: userId },
        }
      );

      return response.json({
        tweets: favorite_tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsByUser(request, response, next) {
    const { userId } = request.params;
    const { id } = helpers.decodeUser(request);
    let { limit, list } = request.query;
    limit = limit || 9;
    list = list || 1;
    let offset = list * limit - limit;

    const tweets = await dbRequestTweets.getTweetsByUser(
      userId,
      id,
      limit,
      offset
    );

    let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
      limit,
      list,
      { where: { userId: userId } }
    );

    return response.json({
      tweets: tweets,
      moreTweets: isTweetsOnNextPage,
    });
  }

  async publicTweets(request, response, next) {
    try {
      let { limit, list } = request.query;
      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getAllTweets(limit, offset);

      let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
        limit,
        list
      );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsWithUserLikes(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getTweetsWithUserLikes(
        userId,
        authUserId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isLikedTweetsOnNextList(
        limit,
        list,
        {
          where: { userId: userId },
        }
      );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsForAuthUserByFollowings(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getTweetsByFollowingUsers(
        userId,
        authUserId,
        limit,
        offset
      );

      let isTweetsOnNextPage =
        await dbRequestTweets.isTweetsByFollowingsOnNextList(
          userId,
          limit,
          list
        );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsWithUserAnswers(request, response, next) {
    try {
      const { userId } = request.params;
      let { limit, list } = request.query;

      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const answers = await dbRequestTweets.getCommentsByUser(
        userId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isAnswersOnNextList(
        limit,
        list,
        {
          where: { userId: userId },
        }
      );

      return response.json({
        tweets: answers,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async tweetsByUserWithMedia(request, response, next) {
    try {
      const { userId } = request.params;
      const user = helpers.decodeUser(request);
      const authUserId = user.id;

      let { limit, list } = request.query;
      limit = limit || 9;
      list = list || 1;
      let offset = list * limit - limit;

      const tweets = await dbRequestTweets.getUserTweetsWithMedia(
        userId,
        authUserId,
        limit,
        offset
      );

      let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
        limit,
        list,
        {
          where: { userId: userId, img: { [Op.ne]: null } },
        }
      );

      return response.json({
        tweets: tweets,
        moreTweets: isTweetsOnNextPage,
      });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async newTweetAndTrend(request, response, next) {
    const { text } = request.body;

    const file = request.files;
    const user = helpers.decodeUser(request);
    const userId = user.id;

    const tweet = await dbRequestTweets.createTweetByUser(
      text,
      file,
      userId,
      request,
      response,
      next
    );

    const trend = await trendsDecorator.newTrend(text, response, next);

    return response.json({ tweet, trend });
  }

  async deletedTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const deletedTweet = await dbRequestTweets.deleteTweet(tweetId);

      return response.json(deletedTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async likedTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;

      helpers.checkUsersAuth(request, userId, next);

      const like = await dbRequestActionsTweet.likeTweetByUser(tweetId, userId);

      const likedTweet = await dbRequestActionsTweet.getCountLikes(
        like.tweetId,
        userId
      );

      return response.json(likedTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async dislikeTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;

      helpers.checkUsersAuth(request, userId, next);

      const disLike = await dbRequestActionsTweet.deleteLike(tweetId, userId);

      const dislikedTweet = await dbRequestActionsTweet.getCountLikes(
        disLike.tweetId,
        userId
      );

      return response.json(dislikedTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async newReplies(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;
      const { text } = request.body;

      helpers.checkUsersAuth(request, userId, next);

      const answer = await dbRequestActionsTweet.createCommentByUser(
        tweetId,
        userId,
        text
      );

      const tweetWithAnswer = await dbRequestActionsTweet.getCountComments(
        tweetId
      );

      return response.json(tweetWithAnswer);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async newRetweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;
      const { tweetUserId } = request.body;
      const { text } = request.body;
      const { img } = request.body;

      helpers.checkUsersAuth(request, userId, next);

      const newRetweet = await dbRequestTweets.createRetweetTweet(
        tweetId,
        userId,
        tweetUserId,
        text,
        img
      );

      return response.json(newRetweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteRetweet(request, response, next) {
    try {
      const { retweetId } = request.params;
      const { userId } = request.params;

      helpers.checkUsersAuth(request, userId, next);

      const deletedRetweet = await dbRequestTweets.deleteRetweetTweet(
        retweetId,
        userId
      );

      return response.json(deletedRetweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async newFavoriteTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;
      helpers.checkUsersAuth(request, userId, next);

      const newFavoriteTweet =
        await dbRequestActionsTweet.createFavoriteTweetByUser(tweetId, userId);

      return response.json(newFavoriteTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deletedFavoriteTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;
      helpers.checkUsersAuth(request, userId, next);

      const deletedFavoriteTweet = await dbRequestActionsTweet.deleteBookmark(
        tweetId,
        userId
      );

      return response.json(deletedFavoriteTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async publicTweetsForTrend(request, response, next) {
    const { trend } = request.params;
    let { limit, list } = request.query;

    limit = limit || 9;
    list = list || 1;
    let offset = list * limit - limit;

    const tweets = await trendsDecorator.getPublicTrendsTweets(
      trend,
      limit,
      offset
    );

    let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
      limit,
      list,
      {
        where: { text: { [Op.substring]: trend } },
      }
    );

    return response.json({
      tweets: tweets,
      moreTweets: isTweetsOnNextPage,
    });
  }

  async authUserTweetsForTrend(request, response, next) {
    const user = helpers.decodeUser(request);
    const authUserId = user.id;

    const { trend } = request.params;
    let { limit, list } = request.query;

    limit = limit || 9;
    list = list || 1;
    let offset = list * limit - limit;

    const tweets = await trendsDecorator.getAuthUserTweetsForTrend(
      authUserId,
      trend,
      limit,
      offset
    );

    let isTweetsOnNextPage = await dbRequestTweets.isTweetsOnNextList(
      limit,
      list,
      {
        where: { text: { [Op.substring]: trend } },
      }
    );
    return response.json({
      tweets: tweets,
      moreTweets: isTweetsOnNextPage,
    });
  }
}

module.exports = new TweetsDecorator();
