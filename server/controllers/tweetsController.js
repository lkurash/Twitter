const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");

const { QueryTypes } = require("sequelize");

const db = require("../models/index.js");

const TweetsPresenter = require("../presenters/tweetsPresenter.js");
const CommentsPresenter = require("../presenters/commentsPresenter.js");
const TweetsWithUserLikesPresenter = require("../presenters/tweetsWithUserLikesPresenter.js");
const models = require("../models/index");
const ApiError = require("../error/ApiError.js");
const dbRequestTweetsForAuthUser = require("../sql/dbRequestTweetsForAuthUser ");
const TweetsPresenterForPublicPage = require("../presenters/tweetsPresenterForPublicPage.js");
const dbRequestTweetsWithUserLikes = require("../sql/dbRequestTweetsWithUserLikes.js");
const dbRequestTweetsByFollowingUsers = require("../sql/dbRequestTweetsByFollowingUsers.js");

const trendsController = require("./trendsController.js");
const actionsTweetsController = require("./actionsTweetsController.js");

const Tweets = models.Tweets;
const User = models.User;
const Likes = models.Likes;
const Comments = models.Comments;
const Favorite_tweets = models.Favorite_tweets;
const Following = models.Following;

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

class TweetsController {
  async createTweetByUser(text, file, userId, request, response, next) {
    try {
      if (file) {
        const { imgs } = request.files;
        let tweetImgs = [];

        if (Array.isArray(imgs)) {
          imgs.forEach((tweetImg) => {
            let fileName = uuid.v4() + ".jpg";
            tweetImg.mv(path.resolve(__dirname, "..", "static", fileName));
            tweetImgs.push(fileName);
          });
        } else {
          let fileName = uuid.v4() + ".jpg";
          imgs.mv(path.resolve(__dirname, "..", "static", fileName));
          tweetImgs.push(fileName);
        }

        const newTweet = await Tweets.create({
          text,
          img: tweetImgs.toString(),
          userId,
        });

        const tweet = await Tweets.findOne({
          include: [{ model: User, as: "user" }],
          where: { id: newTweet.id },
        });

        const presenter = new TweetsPresenter([tweet]);

        return presenter.toJSON();
      } else {
        const newTweet = await Tweets.create({ text, userId });

        const tweet = await Tweets.findOne({
          include: [{ model: User, as: "user" }],
          where: { id: newTweet.id },
        });

        const presenter = new TweetsPresenter([tweet]);

        return presenter.toJSON();
      }
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createTweetAndTrends(request, response, next) {
    try {
      const { text } = request.body;

      const file = request.files;
      const user = decodeUser(request);
      const userId = user.id;

      const tweet = await tweetsController.createTweetByUser(
        text,
        file,
        userId,
        request,
        response,
        next
      );

      const trend = await trendsController.createTrends(text, response, next);

      return response.json({ tweet, trend });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createLikeOnTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const like = await actionsTweetsController.likeTweetByUser(
        tweetId,
        userId
      );

      const tweetWithLike = await actionsTweetsController.getCountLikes(
        like.tweetId,
        userId
      );
      return response.json(tweetWithLike);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async deleteLikeOnTweet(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const disLike = await actionsTweetsController.deleteLike(tweetId, userId);

      const dislikedTweet = await actionsTweetsController.getCountLikes(
        disLike.tweetId,
        userId
      );

      return response.json(dislikedTweet);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async createAnswer(request, response, next) {
    const { tweetId } = request.params;
    const { userId } = request.params;
    const { text } = request.body;

    checkUsersAuth(request, userId, next);

    const answer = await actionsTweetsController.createCommentByUser(
      tweetId,
      userId,
      text
    );

    const tweetWithAnswer = await actionsTweetsController.getCountComments(
      tweetId
    );

    return response.json(tweetWithAnswer);
  }

  async createRetweetTweet(request, response, next) {
    const { tweetId } = request.params;
    const { userId } = request.params;
    const { tweetUserId } = request.body;
    const { text } = request.body;
    const { img } = request.body;

    checkUsersAuth(request, userId, next);

    const retweet = await actionsTweetsController.createRetweetByUser(
      tweetId,
      userId,
      tweetUserId,
      text,
      img
    );

    const countRetweet = await actionsTweetsController.getCountRetweets(
      tweetId
    );

    const retweetTweet = await Tweets.findOne({
      include: [
        { model: User, as: "user" },
        { model: User, as: "tweet_user" },
        { model: Likes, as: "likes" },
        { model: Tweets, as: "retweets" },
        { model: Favorite_tweets, as: "favorite_tweets" },
        { model: Comments },
      ],
      where: { id: retweet.id },
    });

    const presenter = new TweetsPresenter([retweetTweet]);

    return response.json(presenter.toJSON());
  }

  async deleteRetweetTweet(request, response, next) {
    const { retweetId } = request.params;
    const { userId } = request.params;
    checkUsersAuth(request, userId, next);

    const deletedRetweet = await actionsTweetsController.deleteRetweetByUser(
      retweetId,
      userId
    );

    const countRetweet = await actionsTweetsController.getCountRetweets(
      deletedRetweet.tweetId
    );

    return response.json({
      tweet: deletedRetweet,
      count: countRetweet ? countRetweet.countRetweets : 0,
    });
  }

  async getTweetsByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "Tweets"."userId" = ${userId} ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await dbRequestTweetsForAuthUser(userId, authUserId, params);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getPublicTweetsByUser(userId, limit, offset) {
    const tweets = await Tweets.findAll({
      order: [["id", "DESC"]],
      where: { userId: userId },
      include: [
        { model: User, as: "user" },
        { model: User, as: "tweet_user" },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new TweetsPresenterForPublicPage(tweets);

    return presenter.toJSON();
  }

  async getTweetsByFollowingUsers(userId, authUserId, limit, offset) {
    const params = `DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await dbRequestTweetsByFollowingUsers(
      userId,
      authUserId,
      params
    );

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async gelAllTweets(limit, offset) {
    const tweets = await Tweets.findAll({
      order: [["id", "DESC"]],
      include: [
        { model: User, as: "user" },
        { model: User, as: "tweet_user" },
      ],
      limit: limit,
      offset: offset,
    });

    console.log(tweets);

    const presenter = new TweetsPresenterForPublicPage(tweets);

    return presenter.toJSON();
  }

  async getTweetsForAuthUser(userId, authUserId, limit, offset) {
    let order = `ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await dbRequestTweetsForAuthUser(userId, authUserId, order);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getFavoriteTweetByUser(userId, authUserId, limit, offset) {
    const params = `WHERE "favorite_tweets"."userId" = ${userId} ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const favoriteTweets = await dbRequestTweetsForAuthUser(
      userId,
      authUserId,
      params
    );

    const presenter = new TweetsPresenter(favoriteTweets);

    return presenter.toJSON();
  }

  async getCommentsByUser(userId, limit, offset) {
    const coments = await Comments.findAll({
      where: { userId: userId },
      include: [
        {
          model: Tweets,
          include: [
            { model: User, as: "user" },
            { model: User, as: "tweet_user" },
          ],
        },
        {
          model: User,
          as: "user",
        },
      ],
      limit: limit,
      offset: offset,
    });

    const presenter = new CommentsPresenter(coments);

    return presenter.toJSON();
  }

  async deleteTweet(request, response, next) {
    try {
      const tweetId = request.params.tweetId;
      const tweet = await Tweets.findOne({
        where: { id: tweetId },
      });

      if (tweet) {
        await Tweets.destroy({
          where: { id: tweetId },
        });

        await Likes.destroy({ where: { tweetId: tweetId } });

        await Comments.destroy({ where: { tweetId: tweetId } });

        await Favorite_tweets.destroy({ where: { tweetId: tweetId } });

        const countRetweet = await actionsTweetsController.getCountRetweets(
          tweetId
        );

        const countLikes = await actionsTweetsController.getCountLikes(tweetId);

        const countAnswers = await actionsTweetsController.getCountComments(
          tweetId
        );

        const countTrends = await trendsController.getCountTrends(tweet.text);

        return response.json(tweet);
      }
    } catch (error) {
      next(ApiError.badRequest("Check tweet.id"));
    }
  }

  async getUserTweetsWithMedia(userId, authUserId, limit, offset) {
    const params = `WHERE "Tweets"."userId" = ${userId} AND "Tweets"."img" IS NOT NULL ORDER BY "Tweets"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweets = await dbRequestTweetsForAuthUser(userId, authUserId, params);

    const presenter = new TweetsPresenter(tweets);

    return presenter.toJSON();
  }

  async getTweetsWithUserLikes(userId, authUserId, limit, offset) {
    const params = `ORDER BY "Likes"."id" DESC LIMIT ${limit} OFFSET ${offset}`;

    const tweetsWithLikes = await dbRequestTweetsWithUserLikes(
      userId,
      authUserId,
      params
    );

    const presenter = new TweetsWithUserLikesPresenter(tweetsWithLikes);

    return presenter.toJSON();
  }
}

const tweetsController = new TweetsController();

module.exports = new TweetsController();
