const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Sequelize = require("sequelize");
const uuid = require("uuid");
const path = require("path");
const TweetsPresenter = require("../presenters/tweetsPresenter");

const models = require("../models/index");
const ApiError = require("../error/ApiError");
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

const deleteActions = async (tweetId) => {
  await Likes.destroy({ where: { tweetId: tweetId } });

  await Comments.destroy({ where: { tweetId: tweetId } });

  await Favorite_tweets.destroy({ where: { tweetId: tweetId } });
};

class ActionsTweetsController {
  async getCountLikes(tweetId) {
    const count = await Likes.count({
      where: { tweetId: tweetId },
    });

    const countLikes = await Tweets.update(
      {
        countLikes: +count,
      },
      {
        where: { id: tweetId },
      }
    );

    const tweet = await Tweets.findOne({
      where: { id: tweetId },
    });

    return tweet;
  }

  async likeTweetByUser(tweetId, userId) {
    const likedTweet = await Likes.create({
      userId: userId,
      tweetId: tweetId,
      like: true,
    });

    return likedTweet;
  }

  async deleteLike(tweetId, userId) {
    const dislikeTweet = await Likes.findOne({
      where: { tweetId: tweetId, userId: userId },
    });

    if (dislikeTweet) {
      const disLike = await Likes.destroy({
        where: { tweetId: tweetId, userId: userId },
      });

      return dislikeTweet;
    }
  }

  async createFavoriteTweetByUser(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;
      checkUsersAuth(request, userId, next);

      const favoriteTweet = await Favorite_tweets.create({
        userId: userId,
        tweetId: tweetId,
        bookmark: true,
      });

      return response.json(favoriteTweet);
    } catch (error) {
      next(ApiError.badRequest("Check user.id or tweet.id"));
    }
  }

  async deleteBookmark(request, response, next) {
    try {
      const { tweetId } = request.params;
      const { userId } = request.params;

      checkUsersAuth(request, userId, next);

      const checkFavoriteTweets = await Favorite_tweets.findOne({
        where: { tweetId: tweetId, userId: userId },
      });

      if (checkFavoriteTweets) {
        const deleteFavoriteTweet = await Favorite_tweets.destroy({
          where: { tweetId: tweetId, userId: userId },
        });

        response.json(checkFavoriteTweets);
      }
    } catch (error) {
      next(ApiError.badRequest("Check user.id or tweet.id"));
    }
  }

  async createRetweetByUser(tweetId, userId, tweetUserId, text, img) {
    const retweet = await Tweets.create({
      userId: userId,
      tweetId: tweetId,
      text,
      img,
      retweet: true,
      tweetUserId: tweetUserId,
    });
    return retweet;
  }

  async deleteRetweetByUser(retweetId, userId) {
    const retweetFoundId = await Tweets.findOne({
      where: { id: +retweetId, userId: +userId, retweet: true },
    });
    const retweetFoundTweetId = await Tweets.findOne({
      where: { tweetId: +retweetId, userId: +userId, retweet: true },
    });

    if (retweetFoundId) {
      await Tweets.destroy({
        where: { id: retweetId, userId: userId, retweet: true },
      });

      return retweetFoundId;
    } else if (retweetFoundTweetId) {
      await Tweets.destroy({
        where: { tweetId: retweetId, userId: userId },
      });
      return retweetFoundTweetId;
    }
  }

  async getCountRetweets(tweetId) {
    const Op = Sequelize.Op;

    if (tweetId) {
      const count = await Tweets.count({
        where: { tweetId: tweetId, retweet: true },
      });

      await Tweets.update(
        {
          countRetweets: +count,
        },
        {
          where: { id: tweetId, retweet: false },
        }
      );

      await Tweets.update(
        {
          countRetweets: +count,
        },
        {
          where: { tweetId: tweetId, retweet: true },
        }
      );

      const tweet = await Tweets.findOne({
        where: { id: tweetId, retweet: false },
      });

      return tweet;
    }
  }

  async createCommentByUser(tweetId, userId, text) {
    if (text) {
      const comment = await Comments.create({
        userId: userId,
        tweetId: tweetId,
        text,
      });

      return comment;
    }
  }

  async getCountComments(tweetId) {
    if (tweetId) {
      const count = await Comments.count({
        where: { tweetId: tweetId },
      });

      const countComments = await Tweets.update(
        {
          countComments: +count,
        },
        {
          where: { id: tweetId },
        }
      );

      return { countComments: +count };
    }
  }
}

module.exports = new ActionsTweetsController();
